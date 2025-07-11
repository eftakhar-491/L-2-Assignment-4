import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBook } from "../../interfaces/IBook";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://l-2-assignment-3.vercel.app/api",
  }),
  tagTypes: ["Book"],
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
    addBook: builder.mutation<IBook, Partial<IBook>>({
      query: (body) => ({
        url: "/books",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation<IBook, Partial<IBook>>({
      query: ({ _id, ...body }) => ({
        url: `/books/${_id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Book"],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (_id) => ({
        url: `/books/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
    getBorrow: builder.query({
      query: () => "/borrow",
      transformResponse: (response: { data: any[] }) =>
        response.data ? response.data : [],
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
      invalidatesTags: ["Book"],
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
} = bookApi;
