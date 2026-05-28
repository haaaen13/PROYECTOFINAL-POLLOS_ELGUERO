using backend.Data;
using backend.Dtos.CierreCaja;
using backend.Models;
using backend.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class CierresCajaController : ControllerBase
{
    private readonly AppDbContext _contexto;

    public CierresCajaController(AppDbContext contexto)
    {
        _contexto = contexto;
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

    [HttpGet("resumen-turno")]
    public async Task<ActionResult<ResumenCierreCajaDto>> GetResumenTurno()
    {
        int empleadoId = ObtenerEmpleadoId();


        var turno = await _contexto
            .TurnosCaja.Include(t => t.Ventas)
            .Include(t => t.Movimientos)
            .FirstOrDefaultAsync(t => t.EmpleadoId == empleadoId && t.Abierto);

        if (turno == null)
        {
            return BadRequest(new { error = "No existe un turno abierto" });
        }

        var ventasValidas = turno.Ventas.Where(v => !v.Cancelada).ToList();

        decimal ventasEfectivo = ventasValidas
            .Where(v => v.MetodoPago == MetodoPago.Efectivo)
            .Sum(v => v.Total);

        decimal ventasTarjeta = ventasValidas
            .Where(v => v.MetodoPago == MetodoPago.Tarjeta)
            .Sum(v => v.Total);

        decimal ventasTransferencia = ventasValidas
            .Where(v => v.MetodoPago == MetodoPago.Transferencia)
            .Sum(v => v.Total);

        decimal entradas = turno
            .Movimientos.Where(m => m.Tipo == TipoMovimientoCaja.Entrada)
            .Sum(m => m.Monto);

        decimal salidas = turno
            .Movimientos.Where(m => m.Tipo == TipoMovimientoCaja.Salida)
            .Sum(m => m.Monto);

        decimal efectivoEsperado = turno.FondoInicial + ventasEfectivo + entradas - salidas;

        decimal totalVentas = ventasValidas.Sum(v => v.Total);

        return Ok(
            new ResumenCierreCajaDto
            {
                FondoInicial = turno.FondoInicial,

                VentasEfectivo = ventasEfectivo,

                VentasTarjeta = ventasTarjeta,

                VentasTransferencia = ventasTransferencia,

                Entradas = entradas,

                Salidas = salidas,

                EfectivoEsperado = efectivoEsperado,

                TotalVentas = totalVentas,

                TotalVentasRealizadas = ventasValidas.Count,

                TotalMovimientos = turno.Movimientos.Count,
            }
        );
    }

    [HttpPost]
    public async Task<ActionResult<CierreCajaDto>> CrearCierre([FromBody] CrearCierreCajaDto dto)
    {
        int empleadoId = ObtenerEmpleadoId();

        var turno = await _contexto
            .TurnosCaja.Include(t => t.Ventas)
            .Include(t => t.Movimientos)
            .Include(t => t.Sucursal)
            .Include(t => t.Empleado)
            .Include(t => t.CierreCaja)
            .FirstOrDefaultAsync(t => t.EmpleadoId == empleadoId && t.Abierto);

        if (turno == null)
        {
            return BadRequest(new { error = "No existe un turno abierto" });
        }

        if (turno.CierreCaja != null)
        {
            return BadRequest(new { error = "Este turno ya fue cerrado" });
        }

        var ventasValidas = turno.Ventas.Where(v => !v.Cancelada).ToList();

        decimal ventasEfectivo = ventasValidas
            .Where(v => v.MetodoPago == MetodoPago.Efectivo)
            .Sum(v => v.Total);

        decimal ventasTarjeta = ventasValidas
            .Where(v => v.MetodoPago == MetodoPago.Tarjeta)
            .Sum(v => v.Total);

        decimal ventasTransferencia = ventasValidas
            .Where(v => v.MetodoPago == MetodoPago.Transferencia)
            .Sum(v => v.Total);

        decimal entradas = turno
            .Movimientos.Where(m => m.Tipo == TipoMovimientoCaja.Entrada)
            .Sum(m => m.Monto);

        decimal salidas = turno
            .Movimientos.Where(m => m.Tipo == TipoMovimientoCaja.Salida)
            .Sum(m => m.Monto);

        decimal efectivoEsperado = turno.FondoInicial + ventasEfectivo + entradas - salidas;

        decimal totalVentas = ventasValidas.Sum(v => v.Total);

        decimal diferencia = dto.EfectivoReal - efectivoEsperado;

        var cierre = new CierreCaja
        {
            FechaCierre = DateTime.UtcNow,

            FondoInicial = turno.FondoInicial,

            VentasEfectivo = ventasEfectivo,

            VentasTarjeta = ventasTarjeta,

            VentasTransferencia = ventasTransferencia,

            Entradas = entradas,

            Salidas = salidas,

            EfectivoEsperado = efectivoEsperado,

            EfectivoReal = dto.EfectivoReal,

            Diferencia = diferencia,

            TotalVentas = totalVentas,

            Observaciones = dto.Observaciones,

            TurnoCajaId = turno.Id,

            EmpleadoId = empleadoId,
        };

        turno.Abierto = false;

        turno.FechaCierre = DateTime.UtcNow;

        _contexto.CierresCaja.Add(cierre);

        await _contexto.SaveChangesAsync();

        return Ok(
            new CierreCajaDto
            {
                Id = cierre.Id,

                FechaCierre = cierre.FechaCierre,

                FondoInicial = cierre.FondoInicial,

                VentasEfectivo = cierre.VentasEfectivo,

                VentasTarjeta = cierre.VentasTarjeta,

                VentasTransferencia = cierre.VentasTransferencia,

                Entradas = cierre.Entradas,

                Salidas = cierre.Salidas,

                EfectivoEsperado = cierre.EfectivoEsperado,

                EfectivoReal = cierre.EfectivoReal,

                Diferencia = cierre.Diferencia,

                TotalVentas = cierre.TotalVentas,

                Observaciones = cierre.Observaciones,

                TurnoCajaId = cierre.TurnoCajaId,

                Empleado = new EmpleadoCierreDto
                {
                    Id = turno.Empleado.Id,

                    Nombre = turno.Empleado.Nombre,

                    ApellidoPaterno = turno.Empleado.ApellidoPaterno,
                },

                Sucursal = new SucursalCierreDto
                {
                    Id = turno.Sucursal.Id,

                    Nombre = turno.Sucursal.Nombre,
                },
            }
        );
    }

    [HttpGet("mis-cierres")]
    public async Task<ActionResult<List<CierreCajaDto>>> GetMisCierres()
    {
        int empleadoId = ObtenerEmpleadoId();

        var cierres = await _contexto
            .CierresCaja.Include(c => c.Empleado)
            .Include(c => c.TurnoCaja)
                .ThenInclude(t => t.Sucursal)
            .Where(c => c.EmpleadoId == empleadoId)
            .OrderByDescending(c => c.FechaCierre)
            .Select(c => new CierreCajaDto
            {
                Id = c.Id,

                FechaCierre = c.FechaCierre,

                FondoInicial = c.FondoInicial,

                VentasEfectivo = c.VentasEfectivo,

                VentasTarjeta = c.VentasTarjeta,

                VentasTransferencia = c.VentasTransferencia,

                Entradas = c.Entradas,

                Salidas = c.Salidas,

                EfectivoEsperado = c.EfectivoEsperado,

                EfectivoReal = c.EfectivoReal,

                Diferencia = c.Diferencia,

                TotalVentas = c.TotalVentas,

                Observaciones = c.Observaciones,

                TurnoCajaId = c.TurnoCajaId,

                Empleado = new EmpleadoCierreDto
                {
                    Id = c.Empleado.Id,

                    Nombre = c.Empleado.Nombre,

                    ApellidoPaterno = c.Empleado.ApellidoPaterno,
                },

                Sucursal = new SucursalCierreDto
                {
                    Id = c.TurnoCaja.Sucursal.Id,

                    Nombre = c.TurnoCaja.Sucursal.Nombre,
                },
            })
            .ToListAsync();

        return Ok(cierres);
    }

    [HttpGet]
    public async Task<ActionResult<List<CierreCajaDto>>> GetCierres()
    {
        var cierres = await _contexto
            .CierresCaja.Include(c => c.Empleado)
            .Include(c => c.TurnoCaja)
                .ThenInclude(t => t.Sucursal)
            .OrderByDescending(c => c.FechaCierre)
            .Select(c => new CierreCajaDto
            {
                Id = c.Id,

                FechaCierre = c.FechaCierre,

                FondoInicial = c.FondoInicial,

                VentasEfectivo = c.VentasEfectivo,

                VentasTarjeta = c.VentasTarjeta,

                VentasTransferencia = c.VentasTransferencia,

                Entradas = c.Entradas,

                Salidas = c.Salidas,

                EfectivoEsperado = c.EfectivoEsperado,

                EfectivoReal = c.EfectivoReal,

                Diferencia = c.Diferencia,

                TotalVentas = c.TotalVentas,

                Observaciones = c.Observaciones,

                TurnoCajaId = c.TurnoCajaId,

                Empleado = new EmpleadoCierreDto
                {
                    Id = c.Empleado.Id,

                    Nombre = c.Empleado.Nombre,

                    ApellidoPaterno = c.Empleado.ApellidoPaterno,
                },

                Sucursal = new SucursalCierreDto
                {
                    Id = c.TurnoCaja.Sucursal.Id,

                    Nombre = c.TurnoCaja.Sucursal.Nombre,
                },
            })
            .ToListAsync();

        return Ok(cierres);
    }
}
