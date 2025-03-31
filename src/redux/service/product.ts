import { o2API } from "../api";

export const productAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // get all product
    getAllProduct: builder.query({
      query: () => ({
        url: `/api/products`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    // get product by uuid
    getProductByUuid: builder.query<any, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `/api/products/${uuid}`,
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
        preorder_duration: number;
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
        price,
        is_preorder,
        expiration_date,
        multi_images,
      }) => ({
        url: `/api/products`,
        method: "POST",
        body: {
          name,
          price,
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

    // update product
    updateProduct: builder.mutation<
      any,
      {
        uuid: string;
        name: string;
        description: string;
        category_uuid: string;
        discount_uuid: string;
        subcategory_uuid: string;
        price: number;
        stock: number;
        is_preorder: boolean;
        preorder_duration: number;
        expiration_date: string;

        multi_images: string[];
      }
    >({
      query: ({
        uuid,
        name,
        description,
        category_uuid,
        discount_uuid,

        subcategory_uuid,
        preorder_duration,
        stock,
        price,
        is_preorder,
        expiration_date,
        multi_images,
      }) => ({
        url: `/api/products/${uuid}`,
        method: "PUT",
        body: {
          name,
          price,
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

    // delete product
    deleteProduct: builder.mutation<any, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `/api/products/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductByUuidQuery,
  useUpdateProductMutation,
} = productAPI;
