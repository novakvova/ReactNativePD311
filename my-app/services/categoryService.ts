// @ts-ignore

import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "@/utils/createBaseQuery";
import {ICategoryItem} from "@/interfaces/category/ICategoryItem";

//@ts-ignore
export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: createBaseQuery('categories'),
    tagTypes: ['Categories'],

    endpoints: (builder) => ({
        getCategories: builder.query<ICategoryItem[], void>({
            query: () => {
                return {
                    url: '',
                    method: 'GET'
                };
            },
            providesTags: ["Categories"]
        }),

        getCategoryById: builder.query<ICategoryItem, number>({
            query: (id) => {
                return {
                    url: `/${id}`,
                    method: 'GET'
                }
            }
        }),

        createCategory: builder.mutation<ICategoryItem, FormData>({
            query: (formData) =>({
                url: '',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['Categories']
        }),

        updateCategory: builder.mutation<ICategoryItem, FormData>({
            query: (formData) => ({
                url: "",
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["Categories"],
        }),


    }),
})

export const {
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
} = categoryApi;