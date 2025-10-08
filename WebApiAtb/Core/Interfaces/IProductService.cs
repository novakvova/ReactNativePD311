using Core.Models.Product;

namespace Core.Interfaces;

public interface IProductService
{
    Task<List<ProductItemModel>> List();
    Task<ProductItemModel?> GetItemById(int id);
    Task<ProductItemModel> Create(ProductCreateModel model);
    Task<ProductItemModel> Update(ProductUpdateModel model);
    Task Delete(long id);
}
