import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  headers: {
    "x-rapidapi-host": "coinranking1.p.rapidapi.com",
    "x-rapidapi-key": "1567b88662msh02aff047ef5389bp1395b9jsn26e8271e6f12",
  },
};

const baseUrl = "https://api.coingecko.com/api/v3";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest("/global"),
    }),
  }),
});

export const cryptoApiList = createApi({
  reducerPath: "cryptoApiList",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptosList: builder.query({
      query: (count) =>
        createRequest(
          `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${count}&page=1&sparkline=false`
        ),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coins/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, days }) =>
        createRequest(
          `/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
        ),
    }),
    getCryptoExchanges: builder.query({
      query: () => createRequest("/exchanges"),
    }),
  }),
});

export const {
  useGetCryptosListQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetCryptoExchangesQuery,
} = cryptoApiList;
export const { useGetCryptosQuery } = cryptoApi;
