using backend.Models.Enums;

namespace backend.Models;

public class Empleado
{
    public int Id { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public string ApellidoPaterno { get; set; } = string.Empty;

    public string ApellidoMaterno { get; set; } = string.Empty;

    public string Puesto { get; set; } = string.Empty;

    public string Telefono { get; set; } = string.Empty;

    public string Correo { get; set; } = string.Empty;

    public GeneroEmpleado Sexo { get; set; }

    public DateTime FechaNacimiento { get; set; }

    public string Direccion { get; set; } = string.Empty;

    public DateTime ContratadoEl { get; set; } = DateTime.UtcNow;

    public bool Activo { get; set; } = true;

    public int? UserId { get; set; }

    public User? User { get; set; }

    
}