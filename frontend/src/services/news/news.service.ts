import { instance } from '../../api/api.interceptor'
import { INewsCard } from '../../types/section.interface'
import { INew } from './news.interface'

const PATH = 'news'

export const NewsService = {
  async getNews() {
    const { data } = await instance.get<INewsCard[]>(`/${PATH}`)
    return data
  },
  async getNewsWithLimit(limit: string | number) {
    const { data } = await instance.get<INewsCard[]>(`/${PATH}?_limit=${limit}`)
    return data
  },
  async createNew(newData: INew) {
    const { data } = await instance.post<INewsCard>(`/${PATH}/create`, newData)
    return data
  },
  async updateDocById(newData: INewsCard) {
    const { data } = await instance.put<INewsCard>(
      `/${PATH}/${newData.id}`,
      newData
    )
    return data
  }
}
