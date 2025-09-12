using Microsoft.EntityFrameworkCore;

namespace Domain;

public class AppDbATBContext : DbContext
{
    public AppDbATBContext(DbContextOptions<AppDbATBContext> options) : base(options)
    {
    }

    public DbSet<Entities.CategoryEntity> Categories { get; set; } = null!;
}
