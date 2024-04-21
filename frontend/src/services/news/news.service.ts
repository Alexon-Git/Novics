import { INewsCard } from '../../types/section.interface'
import { api } from '../api'
import { Endpoints } from '../endpoints'
import { INew } from './news.interface'

export const newsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createNew: builder.mutation<INewsCard, INew>({
      query: (newData) => ({
        url: Endpoints.NEWS.CREATE,
        method: 'POST',
        body: newData
      })
    }),
    getLimitNews: builder.query<INewsCard[], number>({
      query: (limitData) => ({
        url: Endpoints.NEWS.GET + '?_limit=' + limitData,
        method: 'GET'
      })
    }),
    getSearchNews: builder.query<INewsCard[], string>({
      query: (searchData) => ({
        url: Endpoints.NEWS.SEARCH,
        method: 'GET',
        body: searchData
      })
    }),
    deleteNew: builder.mutation<void, { id: number | string }>({
      query: (id) => ({
        url: Endpoints.NEWS.DELETE + '/' + id,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useCreateNewMutation,
  useGetLimitNewsQuery,
  useGetSearchNewsQuery,
  useDeleteNewMutation
} = newsApi

export const {
  endpoints: { createNew, getLimitNews, getSearchNews, deleteNew }
} = newsApi
