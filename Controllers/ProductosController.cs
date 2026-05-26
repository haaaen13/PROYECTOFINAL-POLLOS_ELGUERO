using backend.Data;
using backend.Dtos.Productos;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductosController : ControllerBase
    {
        private readonly AppDbContext _contexto;

        public ProductosController(AppDbContext contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public List<ProductoDto> GetProductos()
        {
            return _contexto
                .Productos.Select(p => new ProductoDto
                {
                    Id = p.Id,
                    Nombre = p.Nombre,
                    Descripcion = p.Descripcion,
                    Precio = p.Precio,
                    Categoria = p.Categoria,
                    ImagenUrl = p.ImagenUrl,
                    Activo = p.Activo,
                })
                .ToList();
        }

        [HttpGet("activos")]
        public List<ProductoDto> GetProductosActivos()
        {
            return _contexto
                .Productos.Where(p => p.Activo)
                .Select(p => new ProductoDto
                {
                    Id = p.Id,
                    Nombre = p.Nombre,
                    Descripcion = p.Descripcion,
                    Precio = p.Precio,
                    Categoria = p.Categoria,
                    ImagenUrl = p.ImagenUrl,
                    Activo = p.Activo,
                })
                .ToList();
        }

        [HttpGet("{id}")]
        public ProductoDto GetProducto(int id)
        {
            var producto = _contexto.Productos.First(p => p.Id == id);

            return new ProductoDto
            {
                Id = producto.Id,
                Nombre = producto.Nombre,
                Descripcion = producto.Descripcion,
                Precio = producto.Precio,
                Categoria = producto.Categoria,
                ImagenUrl = producto.ImagenUrl,
                Activo = producto.Activo,
            };
        }

        [HttpPost]
        public ProductoDto PostProducto(CreateProductoDto newProducto)
        {
            var producto = new Producto
            {
                Nombre = newProducto.Nombre,
                Descripcion = newProducto.Descripcion,
                Precio = newProducto.Precio,
                Categoria = newProducto.Categoria,
                ImagenUrl = newProducto.ImagenUrl,
                Activo = true,
            };

            _contexto.Productos.Add(producto);

            _contexto.SaveChanges();

            return new ProductoDto
            {
                Id = producto.Id,
                Nombre = producto.Nombre,
                Descripcion = producto.Descripcion,
                Precio = producto.Precio,
                Categoria = producto.Categoria,
                ImagenUrl = producto.ImagenUrl,
                Activo = producto.Activo,
            };
        }

        [HttpDelete("{id}")]
        public void DeleteProducto(int id)
        {
            var producto = _contexto.Productos.First(p => p.Id == id);

            _contexto.Productos.Remove(producto);

            _contexto.SaveChanges();
        }

        [HttpPut("{id}")]
        public ProductoDto? PutProducto(int id, UpdateProductoDto updatedProducto)
        {
            if (id != updatedProducto.Id)
                return null;

            var producto = _contexto.Productos.First(p => p.Id == updatedProducto.Id);

            producto.Nombre = updatedProducto.Nombre;
            producto.Descripcion = updatedProducto.Descripcion;
            producto.Precio = updatedProducto.Precio;
            producto.Categoria = updatedProducto.Categoria;
            producto.ImagenUrl = updatedProducto.ImagenUrl;
            producto.Activo = updatedProducto.Activo;

            _contexto.SaveChanges();

            return new ProductoDto
            {
                Id = producto.Id,
                Nombre = producto.Nombre,
                Descripcion = producto.Descripcion,
                Precio = producto.Precio,
                Categoria = producto.Categoria,
                ImagenUrl = producto.ImagenUrl,
                Activo = producto.Activo,
            };
        }

        [HttpPatch("{id}")]
        public void PatchProducto(int id)
        {
            var producto = _contexto.Productos.First(p => p.Id == id);

            producto.Activo = !producto.Activo;

            _contexto.SaveChanges();
        }
    }
}
