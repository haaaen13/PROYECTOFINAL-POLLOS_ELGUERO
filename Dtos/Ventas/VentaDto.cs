using backend.Models.Enums;

namespace backend.Dtos.Ventas;

public class VentaDto
{
    public int Id { get; set; }

    public DateTime FechaVenta { get; set; }

    public decimal Total { get; set; }

    public MetodoPago MetodoPago { get; set; }

    public bool Cancelada { get; set; }

    public int TurnoCajaId { get; set; }

    /*
        NUEVO
    */

    public EmpleadoVentaDto Empleado { get; set; } = null!;

    public SucursalVentaDto Sucursal { get; set; } = null!;

    public List<DetalleVentaDto> Detalles { get; set; } = [];
}

public class VentaDtoSimple
{
    public int Id { get; set; }

    public DateTime FechaVenta { get; set; }

    public decimal Total { get; set; }

    public MetodoPago MetodoPago { get; set; }

    public bool Cancelada { get; set; }

    public int TurnoCajaId { get; set; }

    public EmpleadoVentaDto Empleado { get; set; } = null!;

    public SucursalVentaDto Sucursal { get; set; } = null!;
}
