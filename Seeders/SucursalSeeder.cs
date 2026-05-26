using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Seeders;

public static class SucursalSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        if (await context.Sucursales.AnyAsync())
            return;

        var sucursales = new List<Sucursal>
        {
            new()
            {
                Nombre = "Sucursal Centro",
                Direccion = "Av. Juárez 120, Centro",
                Telefono = "6671234567",
                Encargado = "Carlos López",
                Horario = "8:00 AM - 10:00 PM",
                Activa = true,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop",
            },
            new()
            {
                Nombre = "Sucursal Norte",
                Direccion = "Blvd. Universitarios 450",
                Telefono = "6679876543",
                Encargado = "Ana Torres",
                Horario = "9:00 AM - 11:00 PM",
                Activa = false,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
            },
            new()
            {
                Nombre = "Sucursal Sur",
                Direccion = "Av. México 900",
                Telefono = "6674561234",
                Encargado = "Luis Ramos",
                Horario = "8:00 AM - 9:00 PM",
                Activa = true,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1200&auto=format&fit=crop",
            },
            new()
            {
                Nombre = "Sucursal Plaza",
                Direccion = "Plaza Sendero Local 12",
                Telefono = "6677412589",
                Encargado = "Mariana Castro",
                Horario = "10:00 AM - 11:30 PM",
                Activa = true,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
            },
            new()
            {
                Nombre = "Sucursal Malecón",
                Direccion = "Paseo del Malecón 220",
                Telefono = "6673698521",
                Encargado = "Jorge Medina",
                Horario = "7:00 AM - 12:00 AM",
                Activa = true,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop",
            },
        };

        await context.Sucursales.AddRangeAsync(sucursales);

        await context.SaveChangesAsync();
    }
}
