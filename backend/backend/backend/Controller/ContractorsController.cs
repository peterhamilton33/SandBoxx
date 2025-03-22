using Microsoft.AspNetCore.Mvc;
using ContractorFinder.Data;
using ContractorFinder.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("contractors")]
[ApiController]
public class ContractorsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ContractorsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: /contractors
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Contractor>>> GetContractors()
    {
        return await _context.Contractors.ToListAsync();
    }

    // GET: /contractors/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Contractor>> GetContractor(int id)
    {
        var contractor = await _context.Contractors.FindAsync(id);
        if (contractor == null)
        {
            return NotFound();
        }
        return contractor;
    }

    // POST: /contractors
    [HttpPost]
    public async Task<ActionResult<Contractor>> PostContractor(Contractor contractor)
    {
        _context.Contractors.Add(contractor);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetContractor), new { id = contractor.ContractorId }, contractor);
    }

    // PUT: /contractors/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> PutContractor(int id, Contractor contractor)
    {
        if (id != contractor.ContractorId)
        {
            return BadRequest();
        }

        _context.Entry(contractor).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Contractors.Any(e => e.ContractorId == id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: /contractors/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteContractor(int id)
    {
        var contractor = await _context.Contractors.FindAsync(id);
        if (contractor == null)
        {
            return NotFound();
        }

        _context.Contractors.Remove(contractor);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
