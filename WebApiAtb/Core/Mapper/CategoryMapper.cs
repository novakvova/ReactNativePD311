using AutoMapper;
using Core.Models.Category;
using Domain.Entities;

namespace Core.Mapper;

public class CategoryMapper : Profile
{
    public CategoryMapper()
    {
        CreateMap<CategoryEntity, CategoryItemModel>();

        CreateMap<CategoryCreateModel, CategoryEntity>()
            .ForMember(x => x.Name, opt => opt.MapFrom(x => x.Name.Trim()))
            .ForMember(x => x.Slug, opt => opt.MapFrom(x => x.Slug.Trim()))
            .ForMember(x => x.Image, opt => opt.Ignore());

        CreateMap<CategoryEditModel, CategoryEntity>()
                .ForMember(x => x.Name, opt => opt.MapFrom(x => x.Name.Trim()))
                .ForMember(x => x.Slug, opt => opt.MapFrom(x => x.Slug.Trim()))
                .ForMember(x => x.Image, opt => opt.Ignore());
    }
}
