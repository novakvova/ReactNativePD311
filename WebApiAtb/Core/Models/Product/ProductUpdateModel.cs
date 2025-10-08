using Microsoft.AspNetCore.Http;
using System.Diagnostics.Eventing.Reader;

namespace Core.Models.Product;

public class ProductUpdateModel
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int CategoryId { get; set; }

    public List<IFormFile>? ImageFiles { get; set; }
}
