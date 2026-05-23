using backend.Models.Enums;

namespace backend.Dtos.Empleados;

public class EmpleadoResponseDto
{
    public int Id { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public string ApellidoPaterno { get; set; } = string.Empty;

    public string Puesto { get; set; } = string.Empty;

    public string Correo { get; set; } = string.Empty;

    public GeneroEmpleado Sexo { get; set; }

    public string Telefono { get; set; } = string.Empty;

    public bool Activo { get; set; }
}