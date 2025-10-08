using Core.Interfaces;
using Core.Models.Category;
using Core.Models.Product;
using Microsoft.AspNetCore.Mvc;

namespace WebApiAtb.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController(IProductService productService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> List()
    {
        Thread.Sleep(2000);
        var model = await productService.List();
        return Ok(model);
    }

    //[Authorize(Roles = $"{Roles.Admin}")]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetItemById(int id)
    {
        Thread.Sleep(2000);
        var model = await productService.GetItemById(id);
        if (model == null)
        {
            return NotFound();
        }
        return Ok(model);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] ProductCreateModel model)
    {
        var product = await productService.Create(model);
        return Ok(product);
    }

    [HttpPut] //Якщо є метод Put - це значить змінна даних
    public async Task<IActionResult> Update([FromForm] ProductUpdateModel model)
    {
        var product = await productService.Update(model);

        return Ok(product);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        await productService.Delete(id);
        return Ok();
    }
}
