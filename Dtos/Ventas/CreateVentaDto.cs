using backend.Models.Enums;

namespace backend.Dtos.Ventas;

public class CreateVentaDto
{
    public MetodoPago MetodoPago { get; set; }

    public List<CreateDetalleVentaDto> Detalles { get; set; } = new();
}
