namespace backend.Dtos.Dashboard;

public class DashboardDto
{
    public decimal VentasHoy { get; set; }

    public int NumeroVentasHoy { get; set; }

    public int ProductosActivos { get; set; }

    public int EmpleadosActivos { get; set; }

    public int SucursalesActivas { get; set; }

    public decimal TicketPromedio { get; set; }

    public List<VentasPorDiaDto> VentasPorDia { get; set; } = [];

    public List<MetodoPagoDto> MetodosPago { get; set; } = [];

    public List<ProductoTopDto> ProductosTop { get; set; } = [];

    public List<VentaRecienteDto> UltimasVentas { get; set; } = [];
}
