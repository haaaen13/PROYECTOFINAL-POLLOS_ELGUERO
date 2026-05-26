namespace backend.Dtos.Auth;

public class AuthResponseDto
{
    public string Token { get; set; } = string.Empty;

    public UserAuthDto Usuario { get; set; } = null!;
}
