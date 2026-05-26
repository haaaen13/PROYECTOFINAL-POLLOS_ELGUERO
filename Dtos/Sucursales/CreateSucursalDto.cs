namespace backend.Dtos.Sucursales;

public class CreateSucursalDto
{
    public string Nombre { get; set; } = string.Empty;

    public string Direccion { get; set; } = string.Empty;

    public string Telefono { get; set; } = string.Empty;

    public string Encargado { get; set; } = string.Empty;

    public string Horario { get; set; } = string.Empty;

    public string ImagenUrl { get; set; } = string.Empty;
}
