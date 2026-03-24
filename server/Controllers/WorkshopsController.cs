using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkshopApi.Data;
using WorkshopApi.Models;

namespace WorkshopApi.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class WorkshopsController : ControllerBase {
        private readonly AppDbContext _context;

        public WorkshopsController(AppDbContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Workshop>>> GetWorkshops() {
            return await _context.Workshops.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Workshop>> GetWorkshop(int id) {
            var workshop = await _context.Workshops
                .Include(w => w.Participantes)
                .FirstOrDefaultAsync(w => w.Id == id);

            if (workshop == null) {
                return NotFound();
            }

            return workshop;
        }

        [HttpPost]
        public async Task<ActionResult<Workshop>> PostWorkshop(Workshop workshop) {
            _context.Workshops.Add(workshop);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetWorkshop), new { id = workshop.Id }, workshop);
        }

        [HttpPost("{workshopId}/registrar-presenca/{colaboradorId}")]
        public async Task<IActionResult> RegistrarPresenca(int workshopId, int colaboradorId) {
            var workshop = await _context.Workshops
                .Include(w => w.Participantes)
                .FirstOrDefaultAsync(w => w.Id == workshopId);

            var colaborador = await _context.Colaboradores.FindAsync(colaboradorId);

            if (workshop == null || colaborador == null) {
                return NotFound();
            }

            if (!workshop.Participantes.Any(c => c.Id == colaboradorId)) {
                workshop.Participantes.Add(colaborador);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkshop(int id, Workshop workshop) {
            if (id != workshop.Id) {
                return BadRequest();
            }
            _context.Entry(workshop).State = EntityState.Modified;
            try {
                await _context.SaveChangesAsync();
            } catch (DbUpdateConcurrencyException) {
                if (!WorkshopExists(id)) {
                    return NotFound();
                } else {
                    throw;
                }
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkshop(int id) {
            var workshop = await _context.Workshops.FindAsync(id);
            if (workshop == null) {
                return NotFound();
            }
            _context.Workshops.Remove(workshop);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool WorkshopExists(int id) {
            return _context.Workshops.Any(e => e.Id == id);
        }
    }
}