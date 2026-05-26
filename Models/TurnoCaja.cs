namespace backend.Models;

public class TurnoCaja
{
    public int Id { get; set; }

    public DateTime FechaApertura { get; set; } = DateTime.UtcNow;

    public DateTime? FechaCierre { get; set; }

    public decimal FondoInicial { get; set; }

    public bool Abierto { get; set; } = true;



    public int EmpleadoId { get; set; }

    public Empleado Empleado { get; set; } = null!;

    public int SucursalId { get; set; }

    public Sucursal Sucursal { get; set; } = null!;

    public ICollection<Venta> Ventas { get; set; } = new List<Venta>();

    public ICollection<MovimientoCaja> Movimientos { get; set; } = new List<MovimientoCaja>();

    public CierreCaja? CierreCaja { get; set; }
}
