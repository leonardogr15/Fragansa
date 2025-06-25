using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AnimeManager.API.DTOs;
using AnimeManager.Infrastructure;
using AnimeManager.Domain;

namespace AnimeManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly AnimeContext _context;

        public MoviesController(AnimeContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieDto>>> Get()
        {
            var movies = await _context.Movies
                .Include(m => m.Genre)
                .Include(m => m.Country)
                .Include(m => m.Director)
                .Include(m => m.MovieActors).ThenInclude(ma => ma.Actor)
                .ToListAsync();

            var dtos = movies.Select(m => new MovieDto
            {
                MovieId       = m.MovieId,
                Title         = m.Title,
                Synopsis      = m.Synopsis,
                CoverImageUrl = m.CoverImageUrl,
                TrailerCode   = m.TrailerCode,
                GenreId       = m.GenreId,
                GenreName     = m.Genre.Name,
                CountryId     = m.CountryId,
                CountryName   = m.Country.Name,
                DirectorId    = m.DirectorId,
                DirectorName  = $"{m.Director.FirstName} {m.Director.LastName}",
                ActorIds      = m.MovieActors.Select(ma => ma.ActorId).ToArray(),        // ← aquí
                ActorNames    = m.MovieActors.Select(ma => $"{ma.Actor.FirstName} {ma.Actor.LastName}").ToArray()
            }).ToList();

            return Ok(dtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MovieDto>> Get(int id)
        {
            var m = await _context.Movies
                .Include(x => x.Genre)
                .Include(x => x.Country)
                .Include(x => x.Director)
                .Include(x => x.MovieActors).ThenInclude(ma => ma.Actor)
                .FirstOrDefaultAsync(x => x.MovieId == id);

            if (m == null) return NotFound();

            var dto = new MovieDto {
                MovieId       = m.MovieId,
                Title         = m.Title,
                Synopsis      = m.Synopsis,
                CoverImageUrl = m.CoverImageUrl,
                TrailerCode   = m.TrailerCode,
                GenreId       = m.GenreId,
                GenreName     = m.Genre.Name,
                CountryId     = m.CountryId,
                CountryName   = m.Country.Name,
                DirectorId    = m.DirectorId,
                DirectorName  = $"{m.Director.FirstName} {m.Director.LastName}",
                ActorIds      = m.MovieActors.Select(ma => ma.ActorId).ToArray(),        // ← aquí
                ActorNames    = m.MovieActors.Select(ma => $"{ma.Actor.FirstName} {ma.Actor.LastName}").ToArray()
            };

            return Ok(dto);
        }

        [HttpPost]
        public async Task<ActionResult<MovieDto>> Create([FromBody] MovieSaveDto dto)
        {
            var movie = new Movie
            {
                Title         = dto.Title,
                Synopsis      = dto.Synopsis,
                CoverImageUrl = dto.CoverImageUrl,
                TrailerCode   = dto.TrailerCode,
                GenreId       = dto.GenreId,
                CountryId     = dto.CountryId,
                DirectorId    = dto.DirectorId
            };

            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();

            if (dto.ActorIds?.Any() == true)
            {
                var links = dto.ActorIds.Select(aid => new MovieActor { MovieId = movie.MovieId, ActorId = aid });
                _context.MovieActors.AddRange(links);
                await _context.SaveChangesAsync();
            }

            await _context.Entry(movie).Reference(m => m.Genre).LoadAsync();
            await _context.Entry(movie).Reference(m => m.Country).LoadAsync();
            await _context.Entry(movie).Reference(m => m.Director).LoadAsync();
            await _context.Entry(movie).Collection(m => m.MovieActors).Query()
                          .Include(ma => ma.Actor).LoadAsync();

            var result = new MovieDto
            {
                MovieId       = movie.MovieId,
                Title         = movie.Title,
                Synopsis      = movie.Synopsis,
                CoverImageUrl = movie.CoverImageUrl,
                TrailerCode   = movie.TrailerCode,
                GenreId       = movie.GenreId,
                GenreName     = movie.Genre.Name,
                CountryId     = movie.CountryId,
                CountryName   = movie.Country.Name,
                DirectorId    = movie.DirectorId,
                DirectorName  = $"{movie.Director.FirstName} {movie.Director.LastName}",
                ActorIds      = movie.MovieActors.Select(ma => ma.ActorId).ToArray(),        // ← aquí
                ActorNames    = movie.MovieActors.Select(ma => $"{ma.Actor.FirstName} {ma.Actor.LastName}").ToArray()
            };

            return CreatedAtAction(nameof(Get), new { id = movie.MovieId }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] MovieSaveDto dto)
        {
            var movie = await _context.Movies
                .Include(m => m.MovieActors)
                .FirstOrDefaultAsync(m => m.MovieId == id);

            if (movie == null) return NotFound();

            movie.Title         = dto.Title;
            movie.Synopsis      = dto.Synopsis;
            movie.CoverImageUrl = dto.CoverImageUrl;
            movie.TrailerCode   = dto.TrailerCode;
            movie.GenreId       = dto.GenreId;
            movie.CountryId     = dto.CountryId;
            movie.DirectorId    = dto.DirectorId;

            _context.MovieActors.RemoveRange(movie.MovieActors);
            if (dto.ActorIds?.Any() == true)
            {
                var links = dto.ActorIds.Select(aid => new MovieActor { MovieId = id, ActorId = aid });
                _context.MovieActors.AddRange(links);
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null) return NotFound();

            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
