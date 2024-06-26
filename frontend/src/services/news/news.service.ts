import { instance } from '../../api/api.interceptor'
import { INewsCard } from '../../types/section.interface'
import { INew } from './news.interface'

const PATH = 'news'

export const NewsService = {
  async getNews() {
    return await instance.get<INewsCard[]>(`/${PATH}`)
  },
  async getNewsWithLimit(limit: number | string) {
    return await instance.get<INewsCard[]>(`/${PATH}?filter=all&limit=${limit}`)
  },
  async createNew(newData: Partial<INew>) {
    return await instance.post<INewsCard>(`/${PATH}`, newData)
  },
  async updateNewById(newData: INewsCard) {
    return await instance.put<INewsCard>(
      `/${PATH}/${newData.id}`,
      newData
    )
  },
  async patchNewById({newData, id}: {newData: Partial<INewsCard>, id: string | number}) {
    return await instance.patch<INewsCard>(
      `/${PATH}/${id}`,
      newData
    )
  },
  async delNewById(newData: INewsCard) {
    return await instance.delete<void>(
      `/${PATH}/${newData.id}`,
    )
  },
}
