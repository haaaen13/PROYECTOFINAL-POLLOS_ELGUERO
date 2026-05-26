// Dtos/CierreCaja/CierreCajaDto.cs

namespace backend.Dtos.CierreCaja;

public class CierreCajaDto
{
    public int Id { get; set; }

    public DateTime FechaCierre { get; set; }

    public decimal FondoInicial { get; set; }

    public decimal VentasEfectivo { get; set; }

    public decimal VentasTarjeta { get; set; }

    public decimal VentasTransferencia { get; set; }

    public decimal Entradas { get; set; }

    public decimal Salidas { get; set; }

    public decimal EfectivoEsperado { get; set; }

    public decimal EfectivoReal { get; set; }

    public decimal Diferencia { get; set; }

    public decimal TotalVentas { get; set; }

    public string? Observaciones { get; set; }

    public int TurnoCajaId { get; set; }

    public EmpleadoCierreDto Empleado { get; set; } = null!;

    public SucursalCierreDto Sucursal { get; set; } = null!;
}

public class EmpleadoCierreDto
{
    public int Id { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public string ApellidoPaterno { get; set; } = string.Empty;
}

public class SucursalCierreDto
{
    public int Id { get; set; }

    public string Nombre { get; set; } = string.Empty;
}
