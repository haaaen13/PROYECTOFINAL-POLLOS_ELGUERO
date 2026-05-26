using backend.Data;
using backend.Dtos.Sucursales;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SucursalController : ControllerBase
    {
        private readonly AppDbContext _contexto;

        public SucursalController(AppDbContext contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public List<SucursalDto> GetSucursales()
        {
            return _contexto
                .Sucursales.Select(s => new SucursalDto
                {
                    Id = s.Id,
                    Nombre = s.Nombre,
                    Direccion = s.Direccion,
                    Telefono = s.Telefono,
                    Encargado = s.Encargado,
                    Horario = s.Horario,
                    Activa = s.Activa,
                    ImagenUrl = s.ImagenUrl,
                })
                .ToList();
        }

        [HttpGet("{id}")]
        public SucursalDto GetSucursal(int id)
        {
            var sucursal = _contexto.Sucursales.First(s => s.Id == id);

            return new SucursalDto
            {
                Id = sucursal.Id,
                Nombre = sucursal.Nombre,
                Direccion = sucursal.Direccion,
                Telefono = sucursal.Telefono,
                Encargado = sucursal.Encargado,
                Horario = sucursal.Horario,
                Activa = sucursal.Activa,
                ImagenUrl = sucursal.ImagenUrl,
            };
        }

        [HttpPost]
        public SucursalDto PostSucursal(CreateSucursalDto newSucursal)
        {
            var sucursal = new Sucursal
            {
                Nombre = newSucursal.Nombre,
                Direccion = newSucursal.Direccion,
                Telefono = newSucursal.Telefono,
                Encargado = newSucursal.Encargado,
                Horario = newSucursal.Horario,
                ImagenUrl = newSucursal.ImagenUrl,
                Activa = true,
            };

            _contexto.Sucursales.Add(sucursal);

            _contexto.SaveChanges();

            return new SucursalDto
            {
                Id = sucursal.Id,
                Nombre = sucursal.Nombre,
                Direccion = sucursal.Direccion,
                Telefono = sucursal.Telefono,
                Encargado = sucursal.Encargado,
                Horario = sucursal.Horario,
                Activa = sucursal.Activa,
                ImagenUrl = sucursal.ImagenUrl,
            };
        }

        [HttpDelete("{id}")]
        public void DeleteSucursal(int id)
        {
            var sucursal = _contexto.Sucursales.First(s => s.Id == id);

            _contexto.Sucursales.Remove(sucursal);

            _contexto.SaveChanges();
        }

        [HttpPut("{id}")]
        public SucursalDto? PutSucursal(int id, UpdateSucursalDto updatedSucursal)
        {
            if (id != updatedSucursal.Id)
                return null;

            var sucursal = _contexto.Sucursales.First(s => s.Id == updatedSucursal.Id);

            sucursal.Nombre = updatedSucursal.Nombre;
            sucursal.Direccion = updatedSucursal.Direccion;
            sucursal.Telefono = updatedSucursal.Telefono;
            sucursal.Encargado = updatedSucursal.Encargado;
            sucursal.Horario = updatedSucursal.Horario;
            sucursal.ImagenUrl = updatedSucursal.ImagenUrl;
            sucursal.Activa = updatedSucursal.Activa;

            _contexto.SaveChanges();

            return new SucursalDto
            {
                Id = sucursal.Id,
                Nombre = sucursal.Nombre,
                Direccion = sucursal.Direccion,
                Telefono = sucursal.Telefono,
                Encargado = sucursal.Encargado,
                Horario = sucursal.Horario,
                Activa = sucursal.Activa,
                ImagenUrl = sucursal.ImagenUrl,
            };
        }

        [HttpPatch("{id}")]
        public void PatchSucursal(int id)
        {
            var sucursal = _contexto.Sucursales.First(s => s.Id == id);

            sucursal.Activa = !sucursal.Activa;

            _contexto.SaveChanges();
        }
    }
}
