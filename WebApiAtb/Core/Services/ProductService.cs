using AutoMapper;
using Core.Interfaces;
using Core.Models.Product;
using Domain;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

public class ProductService(AppDbATBContext atbContext,
    IMapper mapper, IImageService imageService) : IProductService
{
    public async Task<ProductItemModel> Create(ProductCreateModel model)
    {
        var entity = mapper.Map<ProductEntity>(model);
        
        await atbContext.Products.AddAsync(entity);
        await atbContext.SaveChangesAsync();
        short position = 0;
        if (model.ImageFiles != null)
        {
            foreach (var fileImage in model.ImageFiles)
            {
                var entityImage = new ProductImageEntity();
                entityImage.Name = await imageService.SaveImageAsync(fileImage);
                entityImage.Priority = position++;
                entityImage.ProductId = entity.Id;
                atbContext.Add(entityImage);
                await atbContext.SaveChangesAsync();
            }
        }
        var item = mapper.Map<ProductItemModel>(entity);
        return item;
    }

    public async Task Delete(long id)
    {
        var entity = await atbContext.Products.Where(x => x.Id == id)
            .FirstOrDefaultAsync();
        entity!.IsDeleted = true;
        await atbContext.SaveChangesAsync();
    }

    public async Task<ProductItemModel?> GetItemById(int id)
    {
        var model = await mapper
            .ProjectTo<ProductItemModel>(atbContext.Products.Where(x => !x.IsDeleted).Where(x => x.Id == id))
            .SingleOrDefaultAsync();
        return model;
    }

    public async Task<List<ProductItemModel>> List()
    {
        var model = await mapper
            .ProjectTo<ProductItemModel>(atbContext.Products.Where(x => !x.IsDeleted))
            .ToListAsync();
        return model;
    }

    public async Task<ProductItemModel> Update(ProductUpdateModel model)
    {
        return null;
        //var existing = await atbContext.Products.Where(x => !x.IsDeleted).FirstOrDefaultAsync(x => x.Id == model.Id);

        //existing = mapper.Map(model, existing);

        //if (model.ImageFile != null)
        //{
        //    await imageService.DeleteImageAsync(existing.Image);
        //    existing.Image = await imageService.SaveImageAsync(model.ImageFile);
        //}
        //await atbContext.SaveChangesAsync();

        //var item = mapper.Map<ProductItemModel>(existing);
        //return item;
    }
}
