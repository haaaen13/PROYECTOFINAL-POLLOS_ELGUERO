namespace backend.Dtos.TurnosCaja;

public class TurnoAbiertoDto
{
    public int Id { get; set; }

    public string EmpleadoNombre { get; set; } = string.Empty;

    public string EmpleadoApellidoPaterno { get; set; } = string.Empty;

    public string SucursalNombre { get; set; } = string.Empty;

    public DateTime FechaApertura { get; set; }

    public decimal FondoInicial { get; set; }
}
