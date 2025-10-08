using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Domain;

public class AppDbATBContext : DbContext
{
    public AppDbATBContext(DbContextOptions<AppDbATBContext> options) : base(options)
    {
    }

    public DbSet<CategoryEntity> Categories { get; set; } = null!;
    public DbSet<ProductEntity> Products { get; set; }
    public DbSet<ProductImageEntity> ProductImages { get; set; }
}
