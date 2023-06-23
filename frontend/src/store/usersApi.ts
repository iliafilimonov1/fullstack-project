import { IUser } from '@/models/IUser';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (build) => ({
    getUsers: build.query<IUser[], void>({
      query: () => 'users',
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
} = usersApi;
