using backend.Data;
using backend.Models;
using backend.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace backend.Seeders;

public static class VentaSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        if (await context.Ventas.AnyAsync())
            return;

        var productos = await context.Productos.ToListAsync();

        var turnos = await context.TurnosCaja.ToListAsync();

        var random = new Random();

        var ventas = new List<Venta>();

        for (int i = 0; i < 60; i++)
        {
            var turno = turnos[random.Next(turnos.Count)];

            var fecha = DateTime.UtcNow.AddDays(-random.Next(0, 7)).AddHours(-random.Next(0, 12));

            var venta = new Venta
            {
                FechaVenta = fecha,

                MetodoPago = (MetodoPago)random.Next(1, 4),

                TurnoCajaId = turno.Id,

                Cancelada = random.Next(0, 10) == 1,
            };

            int cantidadProductos = random.Next(1, 5);

            decimal total = 0;

            for (int j = 0; j < cantidadProductos; j++)
            {
                var producto = productos[random.Next(productos.Count)];

                int cantidad = random.Next(1, 4);

                decimal subtotal = producto.Precio * cantidad;

                total += subtotal;

                venta.Details.Add(
                    new DetalleVenta
                    {
                        ProductoId = producto.Id,

                        Cantidad = cantidad,

                        PrecioTotal = subtotal,
                    }
                );
            }

            venta.Total = total;

            ventas.Add(venta);
        }

        await context.Ventas.AddRangeAsync(ventas);

        await context.SaveChangesAsync();
    }
}
