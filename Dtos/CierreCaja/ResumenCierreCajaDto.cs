namespace backend.Dtos.CierreCaja;

public class ResumenCierreCajaDto
{
    public decimal FondoInicial { get; set; }

    public decimal VentasEfectivo { get; set; }

    public decimal VentasTarjeta { get; set; }

    public decimal VentasTransferencia { get; set; }

    public decimal Entradas { get; set; }

    public decimal Salidas { get; set; }

    public decimal EfectivoEsperado { get; set; }

    public decimal TotalVentas { get; set; }

    public int TotalVentasRealizadas { get; set; }

    public int TotalMovimientos { get; set; }
}
