import { instance } from '../../api/api.interceptor'
import { INewsCard } from '../../types/section.interface'
import { INew } from './news.interface'

const PATH = 'news'

export const NewsService = {
  async getNews() {
    return await instance.get<INewsCard[]>(`/${PATH}/`)
  },
  async getNewsWithLimit(limit: string | number) {
    return await instance.get<INewsCard[]>(`/${PATH}?_limit=${limit}/`)
  },
  async createNew(newData: INew) {
    return await instance.post<INewsCard>(`/${PATH}/`, newData)
  },
  async updateNewById(newData: INewsCard) {
    return await instance.put<INewsCard>(
      `/${PATH}/${newData.id}/`,
      newData
    )
  },
  async patchNewById(newData: Partial<INewsCard>) {
    return await instance.patch<INewsCard>(
      `/${PATH}/${newData.id}/`,
      newData
    )
  },
  async delNewById(newData: INewsCard) {
    return await instance.delete<void>(
      `/${PATH}/${newData.id}/`,
    )
  },
}
