using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Data;
using backend.Dtos.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    private readonly IConfiguration _config;

    public AuthController(AppDbContext context, IConfiguration config)
    {
        _context = context;

        _config = config;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginDto dto)
    {
        var user = await _context
            .Users.Include(u => u.Empleado)
            .FirstOrDefaultAsync(u => u.Username == dto.Username);

        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.HashedPassword))
        {
            return Unauthorized(new { error = "Credenciales incorrectas" });
        }

        var jwtSettings = _config.GetSection("Jwt");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]!));

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role.ToString()),
            new Claim("sub", user.Username),
        };

        if (user.Empleado != null)
        {
            claims.Add(new Claim("EmpleadoId", user.Empleado.Id.ToString()));
        }

        var tokenDescriptor = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(int.Parse(jwtSettings["ExpireMinutes"]!)),
            signingCredentials: credentials
        );

        var token = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);

        return Ok(
            new AuthResponseDto
            {
                Token = token,

                Usuario = new UserAuthDto
                {
                    Id = user.Id,

                    Username = user.Username,

                    Role = user.Role.ToString(),

                    Empleado =
                        user.Empleado == null
                            ? null
                            : new EmpleadoAuthDto
                            {
                                Id = user.Empleado.Id,

                                Nombre = user.Empleado.Nombre,

                                ApellidoPaterno = user.Empleado.ApellidoPaterno,

                                ApellidoMaterno = user.Empleado.ApellidoMaterno,
                            },
                },
            }
        );
    }
}
