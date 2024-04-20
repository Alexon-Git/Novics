import { RootStore } from '../store'
import { fetchBaseQuery, createApi, retry } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api',
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootStore).auth.token || localStorage.getItem('token')
      if(token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
  }
})

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 2})

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({})
})
