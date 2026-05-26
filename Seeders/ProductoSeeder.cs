using backend.Data;
using backend.Models;
using backend.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace backend.Seeders;

public static class ProductoSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        if (await context.Productos.AnyAsync())
            return;

        var productos = new List<Producto>
        {

            new Producto
            {
                Nombre = "Hamburguesa Clásica",
                Descripcion = "Carne de res con queso y vegetales",
                Precio = 120,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.Hamburguesas,
                Activo = true,
            },
            new Producto
            {
                Nombre = "Hamburguesa BBQ",
                Descripcion = "Con salsa BBQ y tocino",
                Precio = 145,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.Hamburguesas,
                Activo = true,
            },
            new Producto
            {
                Nombre = "Hamburguesa Doble",
                Descripcion = "Doble carne y doble queso",
                Precio = 165,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.Hamburguesas,
                Activo = true,
            },
            new Producto
            {
                Nombre = "Hamburguesa Especial",
                Descripcion = "Con aros de cebolla y aderezo especial",
                Precio = 175,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.Hamburguesas,
                Activo = true,
            },

            new Producto
            {
                Nombre = "Hot Dog Sencillo",
                Descripcion = "Salchicha clásica con vegetales",
                Precio = 65,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1612392062798-29ac2b4c6c2f?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.HotDogs,
                Activo = true,
            },
            new Producto
            {
                Nombre = "Hot Dog Especial",
                Descripcion = "Con tocino y queso",
                Precio = 85,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1550317138-10000687a72b?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.HotDogs,
                Activo = true,
            },
            new Producto
            {
                Nombre = "Hot Dog Jumbo",
                Descripcion = "Pan grande y doble salchicha",
                Precio = 110,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.HotDogs,
                Activo = true,
            },

            new Producto
            {
                Nombre = "Papas Francesas",
                Descripcion = "Orden mediana de papas",
                Precio = 80,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.Papas,
                Activo = true,
            },
            new Producto
            {
                Nombre = "Papas con Queso",
                Descripcion = "Papas bañadas en queso cheddar",
                Precio = 95,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.Papas,
                Activo = true,
            },
            new Producto
            {
                Nombre = "Papas Supremas",
                Descripcion = "Con queso, tocino y jalapeño",
                Precio = 125,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.Papas,
                Activo = true,
            },

            new Producto
            {
                Nombre = "Coca Cola",
                Descripcion = "600ml",
                Precio = 35,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.Bebidas,
                Activo = true,
            },
            new Producto
            {
                Nombre = "Sprite",
                Descripcion = "600ml",
                Precio = 35,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1624517452488-04869289c4ca?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.Bebidas,
                Activo = true,
            },
            new Producto
            {
                Nombre = "Agua Natural",
                Descripcion = "Botella 500ml",
                Precio = 25,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1564419320461-6870880221ad?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.Bebidas,
                Activo = true,
            },
            new Producto
            {
                Nombre = "Té Helado",
                Descripcion = "Vaso grande",
                Precio = 40,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.Bebidas,
                Activo = true,
            },

            new Producto
            {
                Nombre = "Combo Clásico",
                Descripcion = "Hamburguesa, papas y refresco",
                Precio = 185,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.Combos,
                Activo = true,
            },
            new Producto
            {
                Nombre = "Combo BBQ",
                Descripcion = "Hamburguesa BBQ con papas y bebida",
                Precio = 220,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.Combos,
                Activo = true,
            },
            new Producto
            {
                Nombre = "Combo Hot Dog",
                Descripcion = "2 hot dogs y refresco",
                Precio = 170,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.Combos,
                Activo = true,
            },

            new Producto
            {
                Nombre = "Extra Queso",
                Descripcion = "Porción extra de queso",
                Precio = 20,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.Extras,
                Activo = true,
            },
            new Producto
            {
                Nombre = "Extra Tocino",
                Descripcion = "Porción extra de tocino",
                Precio = 30,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1528607929212-2636ec44253e?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.Extras,
                Activo = true,
            },
            new Producto
            {
                Nombre = "Aderezo Ranch",
                Descripcion = "Aderezo extra",
                Precio = 15,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.Extras,
                Activo = true,
            },

            new Producto
            {
                Nombre = "Pay de Queso",
                Descripcion = "Rebanada individual",
                Precio = 55,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.Postres,
                Activo = true,
            },
            new Producto
            {
                Nombre = "Brownie",
                Descripcion = "Brownie de chocolate",
                Precio = 45,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.Postres,
                Activo = true,
            },
            new Producto
            {
                Nombre = "Helado Vainilla",
                Descripcion = "Vaso pequeño",
                Precio = 40,
                ImagenUrl =
                    "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1200&auto=format&fit=crop",
                Categoria = CategoriaProducto.Postres,
                Activo = true,
            },
        };

        await context.Productos.AddRangeAsync(productos);

        await context.SaveChangesAsync();
    }
}
