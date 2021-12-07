import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "X-Api-Key": "c98deb31fb6743feb117bf28804cb77e",
};

const baseUrl = "https://newsapi.org/v2";

const createRequest = (url) => ({ url, header: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/everything?q=${newsCategory}&apiKey=c98deb31fb6743feb117bf28804cb77e`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
