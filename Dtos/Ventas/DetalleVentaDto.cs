namespace backend.Dtos.Ventas;

public class DetalleVentaDto
{
    public int Id { get; set; }

    public int ProductoId { get; set; }

    public string ProductoNombre { get; set; } = string.Empty;

    public decimal Cantidad { get; set; }

    public decimal PrecioTotal { get; set; }
}
