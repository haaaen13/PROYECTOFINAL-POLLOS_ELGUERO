using System;
using System.Collections.Generic;

namespace backend.Dtos.Ventas;

public class VentaResponseDto
{
    public int Id { get; set; }

    public DateTime FechaVenta { get; set; }

    public decimal Total { get; set; }

    public List<DetalleVentaResponseDto> Detalles { get; set; }
        = new();
}