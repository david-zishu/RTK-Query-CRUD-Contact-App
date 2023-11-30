/*
 image url
https://xsgames.co/randomusers/assets/avatars/male/59.jpg
https://xsgames.co/randomusers/assets/avatars/female/59.jpg
*/

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500/" }),
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => "/contacts",
      providesTags: ["Contact"],
    }),
    getSingleContact: builder.query({
      query: (id) => `/contacts/${id}`,
      providesTags: ["Contact"],
    }),
    addContact: builder.mutation({
      query: (contact) => ({
        url: "/contacts",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: ["Contact"],
    }),
    editContact: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/contacts/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Contact"],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetSingleContactQuery,
  useAddContactMutation,
  useEditContactMutation,
  useDeleteContactMutation,
} = contactApi;
