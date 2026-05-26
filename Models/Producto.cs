using backend.Models.Enums;

namespace backend.Models;

public class Producto
{
    public int Id { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public string? Descripcion { get; set; }

    public decimal Precio { get; set; }

    public string ImagenUrl { get; set; } = string.Empty;

    public CategoriaProducto Categoria { get; set; }

    public bool Activo { get; set; } = true;

    public ICollection<DetalleVenta> DetalleVentas { get; set; } = new List<DetalleVenta>();
}
