namespace backend.Dtos.Auth;

public class EmpleadoAuthDto
{
    public int Id { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public string ApellidoPaterno { get; set; } = string.Empty;

    public string ApellidoMaterno { get; set; } = string.Empty;
}
