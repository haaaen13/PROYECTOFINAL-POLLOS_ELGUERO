using backend.Models.Enums;

namespace backend.Dtos.Auth;

public class UserResponseDto
{
    public int Id { get; set; }

    public string Username { get; set; } = string.Empty;

    public UserRole Role { get; set; }
}