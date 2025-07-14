import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBook } from "../../interfaces/IBook";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://l-2-assignment-3.vercel.app/api",
  }),
  tagTypes: ["Book", "Borrow"],
  endpoints: (builder) => ({
    getBooks: builder.query<IBook[], void>({
      query: () => "/books",
      transformResponse: (response: { data: IBook[] }) =>
        response.data ? response.data : [],
      providesTags: ["Book"],
    }),

    getBookDetails: builder.query<IBook, string>({
      query: (bookId) => `/books/${bookId}`,
      transformResponse: (response: any) =>
        response.data ? response.data : null,
    }),
    getBorrowDetails: builder.query<any, string>({
      query: (borrowId) => `/borrow/${borrowId}`,
      transformResponse: (response: any) =>
        response ? response.data[0] : null,
    }),

    addBook: builder.mutation<IBook, Partial<IBook>>({
      query: (body) => ({
        url: "/books",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Book"],
      // onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {

      //   const data = await queryFulfilled;
      //   const patchResult = dispatch(
      //     bookApi.util.updateQueryData("getBooks", undefined, (draft) => {
      //       draft.push({ _id: data?.data?._id, ...arg } as IBook);
      //     })
      //   );
      //   try {
      //     await patchResult;
      //   } catch (error) {
      //     patchResult.undo();
      //     console.error("Failed to add book:", error);
      //   }
      // },
    }),
    updateBook: builder.mutation<IBook, Partial<IBook>>({
      query: ({ _id, ...body }) => ({
        url: `/books/${_id}`,
        method: "PUT",
        body,
      }),
      // invalidatesTags: ["Book"],
      onQueryStarted: async (arg, { dispatch }) => {
        const patchResult = dispatch(
          bookApi.util.updateQueryData("getBooks", undefined, (draft) => {
            const index = draft.findIndex((book) => book._id === arg._id);
            if (index !== -1) {
              draft[index] = { ...draft[index], ...arg } as IBook;
            }
          })
        );
        try {
          await patchResult;
        } catch (error) {
          patchResult.undo();
          console.error("Failed to add book:", error);
        }
      },
    }),
    deleteBook: builder.mutation<void, string>({
      query: (_id) => ({
        url: `/books/${_id}`,
        method: "DELETE",
      }),
      // invalidatesTags: ["Book"],
      onQueryStarted: async (arg, { dispatch }) => {
        const patchResult = dispatch(
          bookApi.util.updateQueryData("getBooks", undefined, (draft) => {
            const index = draft.findIndex((book) => book._id === arg);
            if (index !== -1) {
              draft.splice(index, 1);
            }
          })
        );
        try {
          await patchResult;
        } catch (error) {
          patchResult.undo();
          console.error("Failed to add book:", error);
        }
      },
    }),
    getBorrow: builder.query({
      query: () => "/borrow",
      transformResponse: (response: { data: any[] }) =>
        response.data ? response.data : [],
      providesTags: ["Borrow"],
    }),
    borrowBook: builder.mutation<
      { success: boolean; message: string },
      { book: string; quantity: number; dueDate: string }
    >({
      query: (body) => ({
        url: "/borrow",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Book", "Borrow"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowQuery,
  useGetBookDetailsQuery,
  useGetBorrowDetailsQuery,
} = bookApi;
