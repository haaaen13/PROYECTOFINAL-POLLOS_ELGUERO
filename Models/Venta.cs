using backend.Models.Enums;

namespace backend.Models;

public class Venta
{
    public int Id { get; set; }

    public DateTime FechaVenta { get; set; } = DateTime.UtcNow;

    public decimal Total { get; set; }

    public int TurnoCajaId { get; set; }

    public TurnoCaja TurnoCaja { get; set; } = null!;

    public MetodoPago MetodoPago { get; set; }

    public bool Cancelada { get; set; } = false;

    public ICollection<DetalleVenta> Details { get; set; } = new List<DetalleVenta>();
}
