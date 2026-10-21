using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CursosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CursosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/cursos
        // Suporta busca por nome e filtros combinados de categoria, modalidade e status
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Curso>>> GetCursos(
            [FromQuery] string? nome,
            [FromQuery] string? categoria,
            [FromQuery] string? modalidade,
            [FromQuery] string? status)
        {
            var query = _context.Cursos.AsQueryable();

            if (!string.IsNullOrWhiteSpace(nome))
            {
                query = query.Where(c => c.NomeCompleto.ToLower().Contains(nome.ToLower()) || 
                                         c.NomeBreve.ToLower().Contains(nome.ToLower()));
            }

            if (!string.IsNullOrWhiteSpace(categoria))
            {
                query = query.Where(c => c.Categoria.ToLower() == categoria.ToLower());
            }

            if (!string.IsNullOrWhiteSpace(modalidade))
            {
                query = query.Where(c => c.Modalidade.ToLower() == modalidade.ToLower());
            }

            if (!string.IsNullOrWhiteSpace(status))
            {
                query = query.Where(c => c.Status.ToLower() == status.ToLower());
            }

            var resultados = await query.ToListAsync();
            return Ok(resultados);
        }

        // GET: api/cursos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Curso>> GetCurso(int id)
        {
            var curso = await _context.Cursos.FindAsync(id);

            if (curso == null)
            {
                return NotFound(new { mensagem = "Curso não encontrado." });
            }

            return Ok(curso);
        }
    }
}