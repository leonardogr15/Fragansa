using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AnimeManager.API.DTOs;
using AnimeManager.Domain;
using AnimeManager.Infrastructure;

namespace AnimeManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActorsController : ControllerBase
    {
        private readonly AnimeContext _context;

        public ActorsController(AnimeContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var actors = await _context.Actors
                .Include(a => a.Country)
                .ToListAsync();
            return Ok(actors);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var actor = await _context.Actors
                .Include(a => a.Country)
                .SingleOrDefaultAsync(a => a.ActorId == id);
            if (actor == null) return NotFound();
            return Ok(actor);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ActorDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var actor = new Actor
            {
                FirstName = dto.FirstName,
                LastName  = dto.LastName,
                CountryId = dto.CountryId
            };

            _context.Actors.Add(actor);
            await _context.SaveChangesAsync();

            await _context.Entry(actor).Reference(a => a.Country).LoadAsync();

            return CreatedAtAction(nameof(GetById), new { id = actor.ActorId }, actor);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] ActorDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var actor = await _context.Actors.FindAsync(id);
            if (actor == null) return NotFound();

            actor.FirstName = dto.FirstName;
            actor.LastName  = dto.LastName;
            actor.CountryId = dto.CountryId;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var actor = await _context.Actors.FindAsync(id);
            if (actor == null) return NotFound();

            _context.Actors.Remove(actor);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
