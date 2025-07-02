import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1488" }),
  endpoints: (builder) => ({
    createQuestion: builder.mutation({
      query: (body) => ({
        url: "/question",
        method: "POST",
        body,
      }),
    }),
    getListQuestion: builder.query({
      query: () => "/question",
    }),
    getListQuestionById: builder.query({
      query: (id) => `/question/${id}`,
    }),
  }),
});

export const {
  useCreateQuestionMutation,
  useGetListQuestionQuery,
  useGetListQuestionByIdQuery,
} = questionApi;
