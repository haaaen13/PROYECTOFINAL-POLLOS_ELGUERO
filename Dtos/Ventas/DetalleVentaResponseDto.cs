namespace backend.Dtos.Ventas;

public class DetalleVentaResponseDto
{
    public int ProductoId { get; set; }

    public decimal Cantidad { get; set; }

    public decimal PrecioTotal { get; set; }
}