using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AnimeManager.Infrastructure;
using AnimeManager.Domain;
using Microsoft.AspNetCore.Authorization;
namespace AnimeManager.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class GenresController : ControllerBase
{
    private readonly AnimeContext _ctx;
    public GenresController(AnimeContext ctx) => _ctx = ctx;

    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await _ctx.Genres.ToListAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
        => Ok(await _ctx.Genres.FindAsync(id));

    [HttpPost]
    public async Task<IActionResult> Create(Genre genre)
    {
        _ctx.Genres.Add(genre);
        await _ctx.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = genre.GenreId }, genre);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Genre genre)
    {
        if (id != genre.GenreId) return BadRequest();
        _ctx.Entry(genre).State = EntityState.Modified;
        await _ctx.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var genre = await _ctx.Genres.FindAsync(id);
        if (genre == null) return NotFound();
        _ctx.Genres.Remove(genre);
        await _ctx.SaveChangesAsync();
        return NoContent();
    }
}
