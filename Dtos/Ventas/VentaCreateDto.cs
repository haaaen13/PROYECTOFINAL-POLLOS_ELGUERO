using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Ventas;

public class VentaCreateDto
{
    [Required]
    public int EmpleadoId { get; set; }

    [Required]
    public int SucursalId { get; set; }

    [Required]
    public List<DetalleVentaCreateDto> Detalles { get; set; } = new();
}