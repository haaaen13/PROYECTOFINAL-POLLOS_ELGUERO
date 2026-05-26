using backend.Data;
using backend.Models;
using backend.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace backend.Seeders;

public static class MovimientoCajaSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        if (await context.MovimientosCaja.AnyAsync())
            return;

        var turnos = await context.TurnosCaja.ToListAsync();

        var movimientos = new List<MovimientoCaja>();

        foreach (var turno in turnos)
        {
            movimientos.Add(
                new MovimientoCaja
                {
                    Fecha = DateTime.UtcNow.AddDays(-2),

                    Monto = 500,

                    Tipo = TipoMovimientoCaja.Entrada,

                    Concepto = "Ingreso inicial",

                    TurnoCajaId = turno.Id,

                    EmpleadoId = turno.EmpleadoId,
                }
            );

            movimientos.Add(
                new MovimientoCaja
                {
                    Fecha = DateTime.UtcNow.AddDays(-1),

                    Monto = 250,

                    Tipo = TipoMovimientoCaja.Salida,

                    Concepto = "Compra de insumos",

                    TurnoCajaId = turno.Id,

                    EmpleadoId = turno.EmpleadoId,
                }
            );
        }

        await context.MovimientosCaja.AddRangeAsync(movimientos);

        await context.SaveChangesAsync();
    }
}
