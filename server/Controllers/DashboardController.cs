using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkshopApi.Data;
using WorkshopApi.Models;
using WorkshopApi.Models.DTO;

namespace WorkshopApi.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context) {
            _context = context;
        }

        [HttpGet("stats")]
        public async Task<ActionResult<DashboardDto>> GetStats() {
            var stats = new DashboardDto {
                TotalWorkshops = await _context.Workshops.CountAsync(),
                TotalColaboradores = await _context.Colaboradores.CountAsync(),
                TotalAtas = await _context.Workshops.SelectMany(w => w.Participantes).CountAsync()
            };

            return Ok(stats);
        }

        [HttpGet("por-departamento")]
        public async Task<ActionResult<IEnumerable<DeptStatsDto>>> GetPorDepartamento() {
            var dados = await _context.Colaboradores
                .GroupBy(c => c.Departamento)
                .Select(g => new DeptStatsDto {
                    Departamento = g.Key ?? "Geral",
                    Quantidade = g.Count()
                })
                .ToListAsync();

            return Ok(dados);
        }
    }
}