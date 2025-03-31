import { o2API } from "../api";

export const mediaAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // postImage
    postImage: builder.mutation<any, { image: File }>({
      query: ({ image }) => {
        const formData = new FormData();
        formData.append("image", image);
        return {
          url: `api/images/upload-single`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["userProfile"],
    }),

    // updateProfileUser
    updateProfileUser: builder.mutation<any, any>({
      query: ({ name, bio, avatar }) => ({
        url: `api/users/update-profile`,
        method: "PATCH",
        body: {
          name: name,
          bio: bio,
          avatar: avatar,
        },
      }),
      invalidatesTags: ["userProfile"],
    }),

    // mutli upload image
    postMultiImage: builder.mutation<any, { images: File[] }>({
      query: ({ images }) => {
        const formData = new FormData();
        // Loop through all the images and append each one
        images.forEach((image) => {
          formData.append("images[]", image); // Ensure each file is added as "images[]"
        });
        return {
          url: "/api/images/upload-multiple",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["userProfile"],
    }),
  }),
});

export const {
  useUpdateProfileUserMutation,
  usePostImageMutation,
  usePostMultiImageMutation,
} = mediaAPI;
