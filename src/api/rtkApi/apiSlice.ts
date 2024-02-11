import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { baseURL } from '../baseUrl';
import { invalidatesTags } from '../../redux/invalidatesTags.enum';

const baseQuery = fetchBaseQuery({ baseUrl: baseURL });

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const send = await baseQuery(args, api, extraOptions);
  return send
};

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(invalidatesTags),
  endpoints: (builder) => ({}),
});
