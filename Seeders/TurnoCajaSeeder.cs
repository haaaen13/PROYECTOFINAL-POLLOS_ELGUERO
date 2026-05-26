using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Seeders;

public static class TurnoCajaSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        if (await context.TurnosCaja.AnyAsync())
            return;

        var empleados = await context.Empleados.ToListAsync();

        var sucursales = await context.Sucursales.ToListAsync();

        var turnos = new List<TurnoCaja>
        {
            new()
            {
                EmpleadoId = empleados[0].Id,
                SucursalId = sucursales[0].Id,
                FondoInicial = 2000,
                FechaApertura = DateTime.UtcNow.AddDays(-5),
                Abierto = true,
            },
            new()
            {
                EmpleadoId = empleados[1].Id,
                SucursalId = sucursales[1].Id,
                FondoInicial = 2500,
                FechaApertura = DateTime.UtcNow.AddDays(-3),
                Abierto = true,
            },
            new()
            {
                EmpleadoId = empleados[2].Id,
                SucursalId = sucursales[2].Id,
                FondoInicial = 1800,
                FechaApertura = DateTime.UtcNow.AddDays(-1),
                Abierto = true,
            },
        };

        await context.TurnosCaja.AddRangeAsync(turnos);

        await context.SaveChangesAsync();
    }
}
