using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using AnimeManager.Infrastructure;
using AnimeManager.Domain;

namespace AnimeManager.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CountriesController : ControllerBase
{
    private readonly AnimeContext _ctx;
    public CountriesController(AnimeContext ctx) => _ctx = ctx;

    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await _ctx.Countries.ToListAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
        => Ok(await _ctx.Countries.FindAsync(id));

    [HttpPost]
    public async Task<IActionResult> Create(Country country)
    {
        _ctx.Countries.Add(country);
        await _ctx.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = country.CountryId }, country);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Country country)
    {
        if (id != country.CountryId) return BadRequest();
        _ctx.Entry(country).State = EntityState.Modified;
        await _ctx.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var country = await _ctx.Countries.FindAsync(id);
        if (country == null) return NotFound();
        _ctx.Countries.Remove(country);
        await _ctx.SaveChangesAsync();
        return NoContent();
    }
}

