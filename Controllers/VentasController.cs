// VentasController.cs

using System.Security.Claims;
using backend.Data;
using backend.Dtos.Ventas;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class VentasController : ControllerBase
{
    private readonly AppDbContext _contexto;

    public VentasController(AppDbContext contexto)
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
        api/ventas
    */

    [HttpGet]
    public List<VentaDtoSimple> GetVentas()
    {
        return _contexto
            .Ventas.Include(v => v.TurnoCaja)
                .ThenInclude(t => t.Empleado)
            .Include(v => v.TurnoCaja)
                .ThenInclude(t => t.Sucursal)
            .Select(v => new VentaDtoSimple
            {
                Id = v.Id,
                FechaVenta = v.FechaVenta,
                Total = v.Total,
                MetodoPago = v.MetodoPago,
                Cancelada = v.Cancelada,
                TurnoCajaId = v.TurnoCajaId,
                Empleado = new EmpleadoVentaDto
                {
                    Id = v.TurnoCaja.Empleado.Id,

                    Nombre = v.TurnoCaja.Empleado.Nombre,

                    ApellidoPaterno = v.TurnoCaja.Empleado.ApellidoPaterno,
                },
                Sucursal = new SucursalVentaDto
                {
                    Id = v.TurnoCaja.Sucursal.Id,

                    Nombre = v.TurnoCaja.Sucursal.Nombre,
                },
            })
            .ToList();
    }

    [HttpGet("mis-ventas")]
    [Authorize]
    public async Task<ActionResult<List<VentaDtoSimple>>> GetMisVentas()
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
            Obtener ventas del turno
        */

        var ventas = await _contexto
            .Ventas.Include(v => v.TurnoCaja)
                .ThenInclude(t => t.Empleado)
            .Include(v => v.TurnoCaja)
                .ThenInclude(t => t.Sucursal)
            .Where(v => v.TurnoCajaId == turno.Id)
            .Select(v => new VentaDtoSimple
            {
                Id = v.Id,

                FechaVenta = v.FechaVenta,

                Total = v.Total,

                MetodoPago = v.MetodoPago,

                Cancelada = v.Cancelada,

                TurnoCajaId = v.TurnoCajaId,

                Empleado = new EmpleadoVentaDto
                {
                    Id = v.TurnoCaja.Empleado.Id,

                    Nombre = v.TurnoCaja.Empleado.Nombre,

                    ApellidoPaterno = v.TurnoCaja.Empleado.ApellidoPaterno,
                },

                Sucursal = new SucursalVentaDto
                {
                    Id = v.TurnoCaja.Sucursal.Id,

                    Nombre = v.TurnoCaja.Sucursal.Nombre,
                },
            })
            .ToListAsync();

        return Ok(ventas);
    }

    /*
        POST
        api/ventas
    */

    [HttpPost]
    public async Task<ActionResult<VentaDto>> PostVenta(CreateVentaDto dto)
    {
        int empleadoId = ObtenerEmpleadoId();

        /*
            Obtener turno abierto
        */

        var turno = await _contexto.TurnosCaja.FirstOrDefaultAsync(t =>
            t.EmpleadoId == empleadoId && t.Abierto
        );

        if (turno == null)
        {
            return BadRequest(new { error = "No existe un turno abierto" });
        }

        /*
            Crear venta
        */

        var venta = new Venta
        {
            FechaVenta = DateTime.UtcNow,

            MetodoPago = dto.MetodoPago,

            TurnoCajaId = turno.Id,

            Cancelada = false,
        };

        /*
            Crear detalles
        */

        decimal total = 0;

        foreach (var detalleDto in dto.Detalles)
        {
            var producto = await _contexto.Productos.FirstAsync(p => p.Id == detalleDto.ProductoId);

            decimal subtotal = producto.Precio * detalleDto.Cantidad;

            total += subtotal;

            venta.Details.Add(
                new DetalleVenta
                {
                    ProductoId = producto.Id,

                    Cantidad = detalleDto.Cantidad,

                    PrecioTotal = subtotal,
                }
            );
        }

        venta.Total = total;

        _contexto.Ventas.Add(venta);

        await _contexto.SaveChangesAsync();

        /*
            Retornar DTO
        */

        return Ok(
            new VentaDto
            {
                Id = venta.Id,

                FechaVenta = venta.FechaVenta,

                Total = venta.Total,

                MetodoPago = venta.MetodoPago,

                Cancelada = venta.Cancelada,

                TurnoCajaId = venta.TurnoCajaId,

                Detalles = venta
                    .Details.Select(d => new DetalleVentaDto
                    {
                        Id = d.Id,

                        ProductoId = d.ProductoId,

                        ProductoNombre = _contexto
                            .Productos.First(p => p.Id == d.ProductoId)
                            .Nombre,

                        Cantidad = d.Cantidad,

                        PrecioTotal = d.PrecioTotal,
                    })
                    .ToList(),
            }
        );
    }

    /*
        PATCH
        api/ventas/cancelar/{id}
    */

    [HttpPatch("cancelar/{id}")]
    public async Task<IActionResult> CancelarVenta(int id)
    {
        var venta = await _contexto.Ventas.FirstOrDefaultAsync(v => v.Id == id);

        if (venta == null)
        {
            return NotFound();
        }

        venta.Cancelada = true;

        await _contexto.SaveChangesAsync();

        return Ok();
    }

    /*
    GET
    api/ventas/{id}
*/

    [HttpGet("{id}")]
    public async Task<ActionResult<VentaDto>> GetVenta(int id)
    {
        var venta = await _contexto
            .Ventas.Include(v => v.Details)
                .ThenInclude(d => d.Producto)
            .FirstOrDefaultAsync(v => v.Id == id);

        if (venta == null)
        {
            return NotFound();
        }

        return Ok(
            new VentaDto
            {
                Id = venta.Id,

                FechaVenta = venta.FechaVenta,

                Total = venta.Total,

                MetodoPago = venta.MetodoPago,

                Cancelada = venta.Cancelada,

                TurnoCajaId = venta.TurnoCajaId,

                Detalles = venta
                    .Details.Select(d => new DetalleVentaDto
                    {
                        Id = d.Id,

                        ProductoId = d.ProductoId,

                        ProductoNombre = d.Producto.Nombre,

                        Cantidad = d.Cantidad,

                        PrecioTotal = d.PrecioTotal,
                    })
                    .ToList(),
            }
        );
    }
}
