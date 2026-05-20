using backend.Models.Enums;

namespace backend.Dtos.Auth;

public class CreateUserDto
{
    public string Username { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public UserRole Role { get; set; } = UserRole.Empleado;
}