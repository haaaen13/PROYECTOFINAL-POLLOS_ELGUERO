using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Ventas;

public class DetalleVentaCreateDto
{
    [Required]
    public int ProductoId { get; set; }

    [Required]
    public decimal Cantidad { get; set; }
}