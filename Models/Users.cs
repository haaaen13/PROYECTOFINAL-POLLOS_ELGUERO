using backend.Models.Enums;

namespace backend.Models;

public class User
{
    public int Id { get; set; }

    public string Username { get; set; } = string.Empty;

    public string HashedPassword { get; set; } = string.Empty;

    public UserRole Role { get; set; } = UserRole.Empleado;

    public Empleado? Empleado { get; set; }
}