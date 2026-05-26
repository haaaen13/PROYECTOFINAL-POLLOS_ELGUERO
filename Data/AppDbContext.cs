using backend.Models;
using backend.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<User> Users => Set<User>();

    public DbSet<Empleado> Empleados => Set<Empleado>();

    public DbSet<Producto> Productos => Set<Producto>();

    public DbSet<Sucursal> Sucursales => Set<Sucursal>();

    public DbSet<Venta> Ventas => Set<Venta>();

    public DbSet<DetalleVenta> DetalleVentas => Set<DetalleVenta>();

    public DbSet<TurnoCaja> TurnosCaja { get; set; }

    public DbSet<CierreCaja> CierresCaja { get; set; }

    public DbSet<MovimientoCaja> MovimientosCaja { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>().HasIndex(u => u.Username).IsUnique();

        modelBuilder
            .Entity<User>()
            .HasOne(u => u.Empleado)
            .WithOne(e => e.User)
            .HasForeignKey<Empleado>(e => e.UserId);

        modelBuilder.Entity<Producto>().Property(p => p.Precio).HasPrecision(10, 2);

        modelBuilder.Entity<Venta>().Property(v => v.Total).HasPrecision(10, 2);

        modelBuilder.Entity<DetalleVenta>().Property(d => d.PrecioTotal).HasPrecision(10, 2);
    }
}
