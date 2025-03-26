import { o2API } from "../api";

export const productAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // get all user
    getAllProduct: builder.query({
      query: () => ({
        url: `/api/products`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    // create product
    createProduct: builder.mutation<
      any,
      {
        name: string;
        description: string;
        category_uuid: string;
        discount_uuid: string;
        subcategory_uuid: string;
        price: number;
        stock: number;
        is_preorder: boolean;
        preorder_duration: string;
        expiration_date: string;
        multi_images: string[];
      }
    >({
      query: ({
        name,
        description,
        category_uuid,
        discount_uuid,
        subcategory_uuid,
        preorder_duration,
        stock,
        is_preorder,
        expiration_date,
        multi_images,
      }) => ({
        url: `/api/products`,
        method: "POST",
        body: {
          name,
          description,
          category_uuid,
          discount_uuid,
          subcategory_uuid,
          preorder_duration,
          stock,
          is_preorder,
          expiration_date,
          multi_images,
        },
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const { useGetAllProductQuery, useCreateProductMutation } = productAPI;
