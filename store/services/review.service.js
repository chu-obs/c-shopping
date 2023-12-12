import apiSlice from './api'
export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getReviews: builder.query({
      query: ({ page }) => ({
        url: `/api/reviews?page=${page}`,
        method: 'GET',
      }),
      providesTags: result =>
        result
          ? [
              ...result.data.reviews.map(({ _id }) => ({
                type: 'Review',
                id: _id,
              })),
              'Review',
            ]
          : ['Review'],
    }),

    createReview: builder.mutation({
      query: ({ body, id }) => ({
        url: `/api/reviews/${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Review'],
    }),

    getProductReviews: builder.query({
      query: ({ id, page }) => ({
        url: `/api/reviews/product/${id}?page=${page}&page_size=5`,
        method: 'GET',
      }),
      providesTags: result =>
        result
          ? [
              ...result.data.reviews.map(({ _id }) => ({
                type: 'Review',
                id: _id,
              })),
              'Review',
            ]
          : ['Review'],
    }),

    getSingleReview: builder.query({
      query: ({ id }) => ({
        url: `/api/reviews/${id}`,
        method: 'GET',
      }),
      providesTags: (result, err, arg) => [{ type: 'Review', id: arg.id }],
    }),

    deleteReview: builder.mutation({
      query: ({ id }) => ({
        url: `/api/reviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Review'],
    }),

    editReview: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/reviews/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, err, arg) => [{ type: 'Review', id: arg.id }],
    }),
  }),
})

export const {
  useGetReviewsQuery,
  useGetSingleReviewQuery,
  useDeleteReviewMutation,
  useGetProductReviewsQuery,
  useEditReviewMutation,
  useCreateReviewMutation,
} = reviewApiSlice
