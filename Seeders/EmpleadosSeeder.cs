using backend.Data;
using backend.Models;
using backend.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace backend.Seeders;

public static class EmpleadoSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        if (await context.Empleados.AnyAsync())
            return;

        var empleados = new List<Empleado>
        {
            new()
            {
                Nombre = "Carlos",
                ApellidoPaterno = "Ramirez",
                ApellidoMaterno = "Lopez",
                Puesto = "Cajero",
                Telefono = "6671112233",
                Correo = "carlos@pollosguero.com",
                Sexo = GeneroEmpleado.Masculino,
                FechaNacimiento = new DateTime(1998, 5, 10),
                Direccion = "Colonia Centro",
                ContratadoEl = DateTime.UtcNow.AddMonths(-10),
                Activo = true,
            },
            new()
            {
                Nombre = "Ana",
                ApellidoPaterno = "Torres",
                ApellidoMaterno = "Perez",
                Puesto = "Supervisor",
                Telefono = "6675559988",
                Correo = "ana@pollosguero.com",
                Sexo = GeneroEmpleado.Femenino,
                FechaNacimiento = new DateTime(1995, 8, 15),
                Direccion = "Las Quintas",
                ContratadoEl = DateTime.UtcNow.AddMonths(-14),
                Activo = true,
            },
            new()
            {
                Nombre = "Luis",
                ApellidoPaterno = "Gomez",
                ApellidoMaterno = "Soto",
                Puesto = "Cocinero",
                Telefono = "6674441122",
                Correo = "luis@pollosguero.com",
                Sexo = GeneroEmpleado.Masculino,
                FechaNacimiento = new DateTime(1992, 2, 20),
                Direccion = "Barrancos",
                ContratadoEl = DateTime.UtcNow.AddMonths(-6),
                Activo = true,
            },
        };

        await context.Empleados.AddRangeAsync(empleados);

        await context.SaveChangesAsync();
    }
}
