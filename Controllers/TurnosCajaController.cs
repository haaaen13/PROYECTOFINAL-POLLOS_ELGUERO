using System.Security.Claims;
using backend.Data;
using backend.Dtos.TurnosCaja;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class TurnosCajaController : ControllerBase
{
    private readonly AppDbContext _context;

    public TurnosCajaController(AppDbContext context)
    {
        _context = context;
    }

    private int ObtenerEmpleadoId()
    {
        var claim = User.FindFirst("EmpleadoId");

        if (claim == null)
        {
            throw new UnauthorizedAccessException("Solo empleados pueden realizar esta acción");
        }

        return int.Parse(claim.Value);
    }

    [HttpGet("activo")]
    public async Task<IActionResult> ObtenerTurnoActivo()
    {
        try
        {
            int empleadoId = ObtenerEmpleadoId();

            var turno = await _context
                .TurnosCaja.Include(t => t.Sucursal)
                .FirstOrDefaultAsync(t => t.EmpleadoId == empleadoId && t.Abierto);

            if (turno == null)
            {
                return NotFound();
            }

            return Ok(turno);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { error = ex.Message });
        }
    }

    [HttpPost("abrir")]
    public async Task<IActionResult> AbrirTurno(AbrirTurnoDto dto)
    {
        try
        {
            int empleadoId = ObtenerEmpleadoId();

            int sucursalId = dto.SucursalId;

            var existeTurno = await _context.TurnosCaja.AnyAsync(t =>
                t.EmpleadoId == empleadoId && t.Abierto
            );

            if (existeTurno)
            {
                return BadRequest(new { error = "Ya existe un turno abierto" });
            }

            var turno = new TurnoCaja
            {
                EmpleadoId = empleadoId,

                SucursalId = sucursalId,

                FondoInicial = dto.FondoInicial,

                FechaApertura = DateTime.UtcNow,

                Abierto = true,
            };

            _context.TurnosCaja.Add(turno);

            await _context.SaveChangesAsync();

            return Ok(turno);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { error = ex.Message });
        }
    }

    [HttpGet("abiertos")]
    public async Task<ActionResult<List<TurnoAbiertoDto>>> ObtenerTurnosAbiertos()
    {
        var turnos = await _context
            .TurnosCaja.Include(t => t.Empleado)
            .Include(t => t.Sucursal)
            .Where(t => t.Abierto)
            .Select(t => new TurnoAbiertoDto
            {
                Id = t.Id,

                EmpleadoNombre = t.Empleado.Nombre,

                EmpleadoApellidoPaterno = t.Empleado.ApellidoPaterno,

                SucursalNombre = t.Sucursal.Nombre,

                FechaApertura = t.FechaApertura,

                FondoInicial = t.FondoInicial,
            })
            .ToListAsync();

        return Ok(turnos);
    }
}
