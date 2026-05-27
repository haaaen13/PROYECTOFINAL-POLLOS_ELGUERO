namespace backend.Dtos.Dashboard;

public class VentaRecienteDto
{
    public int Id { get; set; }

    public decimal Total { get; set; }

    public DateTime FechaVenta { get; set; }

    public bool Cancelada { get; set; }

    public string Empleado { get; set; } = string.Empty;
}
