// MovimientosCajaController.cs

using backend.Data;
using backend.Dtos.MovimientosCaja;
using backend.Models;
using backend.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class MovimientosCajaController : ControllerBase
{
    private readonly AppDbContext _contexto;

    public MovimientosCajaController(AppDbContext contexto)
    {
        _contexto = contexto;
    }

    /*
        Obtener empleado desde JWT
    */

    private int ObtenerEmpleadoId()
    {
        var claim = User.FindFirst("EmpleadoId");

        if (claim == null)
        {
            throw new UnauthorizedAccessException("Solo empleados pueden realizar esta acción");
        }

        return int.Parse(claim.Value);
    }

    /*
        GET
        api/movimientoscaja
    */

    [HttpGet]
    public async Task<ActionResult<List<object>>> GetMovimientos()
    {
        var movimientos = await _contexto
            .MovimientosCaja.Include(m => m.Empleado)
            .Include(m => m.TurnoCaja)
                .ThenInclude(t => t.Sucursal)
            .Select(m => new
            {
                Id = m.Id,

                Fecha = m.Fecha,

                Monto = m.Monto,

                Tipo = m.Tipo,

                Concepto = m.Concepto,

                TurnoCajaId = m.TurnoCajaId,

                Empleado = new
                {
                    Id = m.Empleado.Id,

                    Nombre = m.Empleado.Nombre,

                    ApellidoPaterno = m.Empleado.ApellidoPaterno,
                },

                Sucursal = new
                {
                    Id = m.TurnoCaja.Sucursal.Id,

                    Nombre = m.TurnoCaja.Sucursal.Nombre,
                },
            })
            .ToListAsync();

        return Ok(movimientos);
    }

    /*
        GET
        api/movimientoscaja/mis-movimientos
    */

    [HttpGet("mis-movimientos")]
    public async Task<ActionResult<List<object>>> GetMisMovimientos()
    {
        int empleadoId = ObtenerEmpleadoId();

        /*
            Buscar turno abierto
        */

        var turno = await _contexto.TurnosCaja.FirstOrDefaultAsync(t =>
            t.EmpleadoId == empleadoId && t.Abierto
        );

        if (turno == null)
        {
            return BadRequest(new { error = "No existe un turno abierto" });
        }

        /*
            Obtener movimientos del turno
        */

        var movimientos = await _contexto
            .MovimientosCaja.Include(m => m.Empleado)
            .Include(m => m.TurnoCaja)
                .ThenInclude(t => t.Sucursal)
            .Where(m => m.TurnoCajaId == turno.Id)
            .Select(m => new
            {
                Id = m.Id,

                Fecha = m.Fecha,

                Monto = m.Monto,

                Tipo = m.Tipo,

                Concepto = m.Concepto,

                TurnoCajaId = m.TurnoCajaId,

                Empleado = new
                {
                    Id = m.Empleado.Id,

                    Nombre = m.Empleado.Nombre,

                    ApellidoPaterno = m.Empleado.ApellidoPaterno,
                },

                Sucursal = new
                {
                    Id = m.TurnoCaja.Sucursal.Id,

                    Nombre = m.TurnoCaja.Sucursal.Nombre,
                },
            })
            .ToListAsync();

        return Ok(movimientos);
    }

    /*
    POST
    api/movimientoscaja
*/

    [HttpPost]
    public async Task<ActionResult> CrearMovimiento([FromBody] CrearMovimientoCajaDto dto)
    {
        int empleadoId = ObtenerEmpleadoId();

        /*
            Buscar turno abierto
        */

        var turno = await _contexto.TurnosCaja.FirstOrDefaultAsync(t =>
            t.EmpleadoId == empleadoId && t.Abierto
        );

        if (turno == null)
        {
            return BadRequest(new { error = "No existe un turno abierto" });
        }

        /*
            Crear movimiento
        */

        var movimiento = new MovimientoCaja
        {
            Fecha = DateTime.UtcNow,

            Monto = dto.Monto,

            Tipo = dto.Tipo,

            Concepto = dto.Concepto,

            TurnoCajaId = turno.Id,

            EmpleadoId = empleadoId,
        };

        _contexto.MovimientosCaja.Add(movimiento);

        await _contexto.SaveChangesAsync();

        return Ok(
            new
            {
                Id = movimiento.Id,
                Fecha = movimiento.Fecha,
                Monto = movimiento.Monto,
                Tipo = movimiento.Tipo,
                Concepto = movimiento.Concepto,
                TurnoCajaId = movimiento.TurnoCajaId,
                EmpleadoId = movimiento.EmpleadoId,
            }
        );
    }
}
