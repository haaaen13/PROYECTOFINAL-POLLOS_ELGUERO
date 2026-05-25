namespace backend.Models;

public class Sucursal
{
    public int Id { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public string Direccion { get; set; } = string.Empty;

    public ICollection<Venta> Ventas { get; set; }
        = new List<Venta>();
}