import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const answerApi = createApi({
  reducerPath: "answerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1488" }),
  endpoints: (builder) => ({
    createAnswer: builder.mutation({
      query: (body) => ({
        url: "/answer",
        method: "POST",
        body,
      }),
    }),
    getListAnswer: builder.query({
      query: () => "/answer",
    }),
    getListAnswerById: builder.query({
      query: (id) => `/answer/${id}`,
    }),
  }),
});

export const {
  useCreateAnswerMutation,
  useGetListAnswerQuery,
  useGetListAnswerByIdQuery,
} = answerApi;
