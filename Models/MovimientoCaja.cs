using backend.Models.Enums;

namespace backend.Models;

public class MovimientoCaja
{
    public int Id { get; set; }

    public DateTime Fecha { get; set; } = DateTime.UtcNow;

    public decimal Monto { get; set; }

    public TipoMovimientoCaja Tipo { get; set; }

    public string Concepto { get; set; } = string.Empty;

    /*
        Relaciones
    */

    public int TurnoCajaId { get; set; }

    public TurnoCaja TurnoCaja { get; set; } = null!;

    public int EmpleadoId { get; set; }

    public Empleado Empleado { get; set; } = null!;
}
