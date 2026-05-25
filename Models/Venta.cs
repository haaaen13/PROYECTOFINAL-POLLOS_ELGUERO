namespace backend.Models;

public class Venta
{
    public int Id { get; set; }

    public DateTime FechaVenta { get; set; }
        = DateTime.UtcNow;

    public decimal Total { get; set; }

    public int EmpleadoId { get; set; }

    public int SucursalId { get; set; }

    public Empleado Empleado { get; set; } = null!;

    public Sucursal Sucursal { get; set; } = null!;

    public ICollection<DetalleVenta> Details { get; set; }
        = new List<DetalleVenta>();
}