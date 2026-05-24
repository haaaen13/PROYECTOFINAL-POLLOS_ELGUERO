using backend.Models.Enums;

namespace backend.Dtos.Empleados;

public class UpdateEmpleadoDto
{
    public string? Nombre { get; set; }

    public string? ApellidoPaterno { get; set; }

    public string? ApellidoMaterno { get; set; }

    public string? Puesto { get; set; }

    public string? Telefono { get; set; }

    public string? Correo { get; set; }

    public GeneroEmpleado? Sexo { get; set; }

    public DateTime? FechaNacimiento { get; set; }

    public string? Direccion { get; set; }
}