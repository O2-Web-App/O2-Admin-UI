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
  }),
});

export const { useUpdateProfileUserMutation, usePostImageMutation } = mediaAPI;
