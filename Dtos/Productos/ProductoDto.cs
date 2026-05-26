using backend.Models.Enums;

namespace backend.Dtos.Productos;

public class ProductoDto
{
    public int Id { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public string? Descripcion { get; set; }

    public decimal Precio { get; set; }

    public CategoriaProducto Categoria { get; set; }

    public string? ImagenUrl { get; set; }

    public bool Activo { get; set; }
}
