using Microsoft.AspNetCore.Http;

namespace Core.Models.Product;

public class ProductCreateModel
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int CategoryId { get; set; }

    public List<IFormFile>? ImageFiles { get; set; }
}
