import { AxiosResponse } from 'axios'
import { instance } from '../../api/api.interceptor'
import { INewsCard } from '../../types/section.interface'
import { INew } from './news.interface'

const PATH = 'news'

export const NewsService = {
  async getNews(): Promise<AxiosResponse<INewsCard[]>> {
    return await instance.get<INewsCard[]>(`/${PATH}`)
  },
  async getNewsWithLimit(
    limit: string | number
  ): Promise<AxiosResponse<INewsCard[]>> {
    return await instance.get<INewsCard[]>(`/${PATH}?_limit=${limit}`)
  },
  async createNew(data: INew): Promise<AxiosResponse<INewsCard>> {
    return await instance.post<INewsCard>(`/${PATH}/create`, data)
  },
  async updateDocById(data: INewsCard): Promise<AxiosResponse<INewsCard>> {
    return await instance.put<INewsCard>(`/${PATH}/${data.id}`, data)
  }
}
