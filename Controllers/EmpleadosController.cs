using backend.Data;
using backend.Dtos.Empleados;
using backend.Models;
using backend.Models.Enums;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmpleadosController : ControllerBase
    {
        private readonly AppDbContext _contexto;

        public EmpleadosController(AppDbContext contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public List<EmpleadoResponseDto> GetEmpleados()
        {
            return _contexto
                .Empleados.Select(e => new EmpleadoResponseDto
                {
                    Id = e.Id,
                    Nombre = e.Nombre,
                    ApellidoPaterno = e.ApellidoPaterno,
                    Puesto = e.Puesto,
                    Correo = e.Correo,
                    Sexo = e.Sexo,
                    Telefono = e.Telefono,
                    Activo = e.Activo,
                })
                .ToList();
        }

        [HttpGet("{id}")]
        public EmpleadoCompletoDto GetEmpleado(int id)
        {
            var empleado = _contexto.Empleados.First(e => e.Id == id);

            return new EmpleadoCompletoDto
            {
                Id = empleado.Id,
                Nombre = empleado.Nombre,
                ApellidoPaterno = empleado.ApellidoPaterno,
                ApellidoMaterno = empleado.ApellidoMaterno,
                Puesto = empleado.Puesto,
                Telefono = empleado.Telefono,
                Correo = empleado.Correo,
                Sexo = empleado.Sexo,
                FechaNacimiento = empleado.FechaNacimiento,
                Direccion = empleado.Direccion,
                ContratadoEl = empleado.ContratadoEl,
                Activo = empleado.Activo,
                UserId = empleado.UserId,
            };
        }

        [HttpPost]
        public ActionResult<EmpleadoResponseDto> PostEmpleado(CreateEmpleadoDto newEmpleado)
        {
            /*
                Validar username único
            */

            bool existeUsuario = _contexto.Users.Any(u => u.Username == newEmpleado.Username);

            if (existeUsuario)
            {
                return BadRequest(new { error = "El nombre de usuario ya existe" });
            }

            /*
                Crear usuario
            */

            var user = new User
            {
                Username = newEmpleado.Username,

                HashedPassword = BCrypt.Net.BCrypt.HashPassword(newEmpleado.Password),

                Role = UserRole.Empleado,
            };

            _contexto.Users.Add(user);

            _contexto.SaveChanges();

            /*
                Crear empleado
            */

            var empleado = new Empleado
            {
                Nombre = newEmpleado.Nombre,

                ApellidoPaterno = newEmpleado.ApellidoPaterno,

                ApellidoMaterno = newEmpleado.ApellidoMaterno,

                Puesto = newEmpleado.Puesto,

                Telefono = newEmpleado.Telefono,

                Correo = newEmpleado.Correo,

                Sexo = newEmpleado.Sexo,

                FechaNacimiento = newEmpleado.FechaNacimiento,

                Direccion = newEmpleado.Direccion,

                Activo = true,

                UserId = user.Id,
            };

            _contexto.Empleados.Add(empleado);

            _contexto.SaveChanges();

            /*
                Response
            */

            return Ok(
                new EmpleadoResponseDto
                {
                    Id = empleado.Id,

                    Nombre = empleado.Nombre,

                    ApellidoPaterno = empleado.ApellidoPaterno,

                    Puesto = empleado.Puesto,

                    Correo = empleado.Correo,

                    Sexo = empleado.Sexo,

                    Telefono = empleado.Telefono,

                    Activo = empleado.Activo,
                }
            );
        }

        [HttpDelete("{id}")]
        public void DeleteEmpleado(int id)
        {
            var empleado = _contexto.Empleados.First(e => e.Id == id);

            _contexto.Empleados.Remove(empleado);

            _contexto.SaveChanges();
        }

        [HttpPut("{id}")]
        public EmpleadoCompletoDto? PutEmpleado(int id, UpdateEmpleadoDto updatedEmpleado)
        {
            var empleado = _contexto.Empleados.First(e => e.Id == id);

            empleado.Nombre = updatedEmpleado.Nombre ?? empleado.Nombre;
            empleado.ApellidoPaterno = updatedEmpleado.ApellidoPaterno ?? empleado.ApellidoPaterno;
            empleado.ApellidoMaterno = updatedEmpleado.ApellidoMaterno ?? empleado.ApellidoMaterno;
            empleado.Puesto = updatedEmpleado.Puesto ?? empleado.Puesto;
            empleado.Telefono = updatedEmpleado.Telefono ?? empleado.Telefono;
            empleado.Correo = updatedEmpleado.Correo ?? empleado.Correo;
            empleado.Sexo = updatedEmpleado.Sexo ?? empleado.Sexo;
            empleado.FechaNacimiento = updatedEmpleado.FechaNacimiento ?? empleado.FechaNacimiento;
            empleado.Direccion = updatedEmpleado.Direccion ?? empleado.Direccion;

            _contexto.SaveChanges();

            return new EmpleadoCompletoDto
            {
                Id = empleado.Id,
                Nombre = empleado.Nombre,
                ApellidoPaterno = empleado.ApellidoPaterno,
                ApellidoMaterno = empleado.ApellidoMaterno,
                Puesto = empleado.Puesto,
                Telefono = empleado.Telefono,
                Correo = empleado.Correo,
                Sexo = empleado.Sexo,
                FechaNacimiento = empleado.FechaNacimiento,
                Direccion = empleado.Direccion,
                ContratadoEl = empleado.ContratadoEl,
                Activo = empleado.Activo,
                UserId = empleado.UserId,
            };
        }

        [HttpPatch("{id}")]
        public void PatchEmpleado(int id)
        {
            var empleado = _contexto.Empleados.First(e => e.Id == id);

            empleado.Activo = !empleado.Activo;

            _contexto.SaveChanges();
        }
    }
}
