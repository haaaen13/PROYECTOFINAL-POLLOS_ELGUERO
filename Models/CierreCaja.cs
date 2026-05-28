namespace backend.Models;

public class CierreCaja
{
    public int Id { get; set; }

    public DateTime FechaCierre { get; set; } = DateTime.UtcNow;

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

    public TurnoCaja TurnoCaja { get; set; } = null!;

    public int EmpleadoId { get; set; }

    public Empleado Empleado { get; set; } = null!;
}
