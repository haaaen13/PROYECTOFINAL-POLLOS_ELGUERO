using backend.Data;
using backend.Models;
using backend.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace backend.Seeders;

public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
       

        await context.Database.MigrateAsync();

       

        if (!await context.Users.AnyAsync(u => u.Username == "admin"))
        {
            context.Users.Add(
                new User
                {
                    Username = "admin",

                    HashedPassword = BCrypt.Net.BCrypt.HashPassword("123456"),

                    Role = UserRole.Admin,
                }
            );

            await context.SaveChangesAsync();
        }

       

        await ProductoSeeder.SeedAsync(context);

        await SucursalSeeder.SeedAsync(context);

        await EmpleadoSeeder.SeedAsync(context);

        await TurnoCajaSeeder.SeedAsync(context);

        await VentaSeeder.SeedAsync(context);

        await MovimientoCajaSeeder.SeedAsync(context);
    }
}
