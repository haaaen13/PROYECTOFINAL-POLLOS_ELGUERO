using backend.Data;
using backend.Dtos.Dashboard;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _contexto;

    public DashboardController(AppDbContext contexto)
    {
        _contexto = contexto;
    }

    [HttpGet]
    public async Task<ActionResult<DashboardDto>> GetDashboard()
    {
        var hoy = DateTime.UtcNow.Date;

        /*
            Ventas del día
        */

        var ventasHoyLista = await _contexto
            .Ventas.Where(v => !v.Cancelada && v.FechaVenta.Date == hoy)
            .ToListAsync();

        var ventasHoy = ventasHoyLista.Sum(v => v.Total);

        var numeroVentasHoy = ventasHoyLista.Count;

        /*
            Cards
        */

        var productosActivos = await _contexto.Productos.CountAsync(p => p.Activo);

        var empleadosActivos = await _contexto.Empleados.CountAsync(e => e.Activo);

        var sucursalesActivas = await _contexto.Sucursales.CountAsync(s => s.Activa);

        var ticketPromedio = numeroVentasHoy > 0 ? ventasHoy / numeroVentasHoy : 0;

        /*
            Ventas últimos 7 días
        */

        var fechaInicio = hoy.AddDays(-6);

        var ventasPorDia = (
            await _contexto
                .Ventas.Where(v => !v.Cancelada && v.FechaVenta.Date >= fechaInicio)
                .ToListAsync()
        )
            .GroupBy(v => v.FechaVenta.Date)
            .Select(g => new VentasPorDiaDto
            {
                Fecha = g.Key,

                Total = g.Sum(v => v.Total),
            })
            .OrderBy(v => v.Fecha)
            .ToList();

        /*
            Métodos de pago
        */

        var metodosPago = (await _contexto.Ventas.Where(v => !v.Cancelada).ToListAsync())
            .GroupBy(v => v.MetodoPago)
            .Select(g => new MetodoPagoDto
            {
                Metodo = g.Key.ToString(),

                Total = g.Sum(v => v.Total),
            })
            .ToList();

        /*
            Productos top
        */

        var productosTop = (await _contexto.DetalleVentas.Include(d => d.Producto).ToListAsync())
            .GroupBy(d => d.Producto.Nombre)
            .Select(g => new ProductoTopDto
            {
                Producto = g.Key,

                CantidadVendida = g.Sum(x => x.Cantidad),
            })
            .OrderByDescending(p => p.CantidadVendida)
            .Take(5)
            .ToList();

        /*
            Últimas ventas
        */

        var ultimasVentas = (
            await _contexto
                .Ventas.Include(v => v.TurnoCaja)
                    .ThenInclude(t => t.Empleado)
                .ToListAsync()
        )
            .OrderByDescending(v => v.FechaVenta)
            .Take(5)
            .Select(v => new VentaRecienteDto
            {
                Id = v.Id,

                Total = v.Total,

                FechaVenta = v.FechaVenta,

                Cancelada = v.Cancelada,

                Empleado = v.TurnoCaja.Empleado.Nombre + " " + v.TurnoCaja.Empleado.ApellidoPaterno,
            })
            .ToList();

        /*
            Response
        */

        return Ok(
            new DashboardDto
            {
                VentasHoy = ventasHoy,

                NumeroVentasHoy = numeroVentasHoy,

                ProductosActivos = productosActivos,

                EmpleadosActivos = empleadosActivos,

                SucursalesActivas = sucursalesActivas,

                TicketPromedio = ticketPromedio,

                VentasPorDia = ventasPorDia,

                MetodosPago = metodosPago,

                ProductosTop = productosTop,

                UltimasVentas = ultimasVentas,
            }
        );
    }
}
