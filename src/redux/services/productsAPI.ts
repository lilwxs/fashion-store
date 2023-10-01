import { IProduct } from '@/interfaces/products';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    // normal HTTP endpoint using fetchBaseQuery
    getProducts: builder.query<IProduct[], string>({
      query: (url) => `${url}`,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
