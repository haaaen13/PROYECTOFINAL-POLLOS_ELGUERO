namespace backend.Models;

public class DetalleVenta
{
    public int Id { get; set; }

    public decimal Cantidad { get; set; }

    public decimal PrecioTotal { get; set; }

    public int VentaId { get; set; }

    public int ProductoId { get; set; }

    public Venta Sale { get; set; } = null!;

    public Producto Producto { get; set; } = null!;
}