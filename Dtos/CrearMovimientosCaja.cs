// CrearMovimientoCajaDto.cs

using backend.Models.Enums;

namespace backend.Dtos.MovimientosCaja;

public class CrearMovimientoCajaDto
{
    public decimal Monto { get; set; }

    public TipoMovimientoCaja Tipo { get; set; }

    public string Concepto { get; set; } = string.Empty;
}
