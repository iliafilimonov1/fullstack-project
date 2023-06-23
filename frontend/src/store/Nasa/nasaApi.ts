import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Root } from './types';

const ROUTE_PREFIX = 'https://api.nasa.gov/';

export const nasaApi = createApi({
  reducerPath: 'nasaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${ROUTE_PREFIX}mars-photos/api/v1/rovers/curiosity/photos`,
  }),
  endpoints: (build) => ({
    getPhotos: build.query<Root, void>({
      query: () => `?sol=2000&page=1&api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    }),
  }),
});

export const { useGetPhotosQuery } = nasaApi;
