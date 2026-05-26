using backend.Models.Enums;

namespace backend.Dtos.Productos;

public class CreateProductoDto
{
    public string Nombre { get; set; } = string.Empty;

    public string? Descripcion { get; set; }

    public decimal Precio { get; set; }

    public CategoriaProducto Categoria { get; set; }

    public string? ImagenUrl { get; set; }
}
