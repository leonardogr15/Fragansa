using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AnimeManager.API.DTOs;
using AnimeManager.Domain;
using AnimeManager.Infrastructure;      // Donde está tu AnimeContext

namespace AnimeManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DirectorsController : ControllerBase
    {
        private readonly AnimeContext _context;

        public DirectorsController(AnimeContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var directors = await _context.Directors
                .Include(d => d.Country)
                .ToListAsync();
            return Ok(directors);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var director = await _context.Directors
                .Include(d => d.Country)
                .SingleOrDefaultAsync(d => d.DirectorId == id);
            if (director == null) return NotFound();
            return Ok(director);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DirectorDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var director = new Director
            {
                FirstName = dto.FirstName,
                LastName  = dto.LastName,
                CountryId = dto.CountryId
            };

            _context.Directors.Add(director);
            await _context.SaveChangesAsync();

            await _context.Entry(director).Reference(d => d.Country).LoadAsync();

            return CreatedAtAction(nameof(GetById), new { id = director.DirectorId }, director);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] DirectorDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var director = await _context.Directors.FindAsync(id);
            if (director == null) return NotFound();

            director.FirstName = dto.FirstName;
            director.LastName  = dto.LastName;
            director.CountryId = dto.CountryId;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var director = await _context.Directors.FindAsync(id);
            if (director == null) return NotFound();
            _context.Directors.Remove(director);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
