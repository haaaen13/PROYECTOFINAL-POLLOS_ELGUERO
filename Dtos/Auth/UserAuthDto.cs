namespace backend.Dtos.Auth;

public class UserAuthDto
{
    public int Id { get; set; }

    public string Username { get; set; } = string.Empty;

    public string Role { get; set; } = string.Empty;

    public EmpleadoAuthDto? Empleado { get; set; }
}
