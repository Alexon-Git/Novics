import { AxiosResponse } from 'axios'
import { IDocsCard } from '../../types/section.interface'
import { instance } from '../../api/api.interceptor'
import { IDoc } from './docs.interface'

const PATH = 'docs'

export const DocsService = {
  async getDocs(): Promise<AxiosResponse<IDocsCard[]>> {
    return await instance.get<IDocsCard[]>(`/${PATH}`)
  },
  async getDocsWithLimit(
    limit: string | number
  ): Promise<AxiosResponse<IDocsCard[]>> {
    return await instance.get<IDocsCard[]>(`/${PATH}?_limit=${limit}`)
  },
  async createDoc(data: IDoc): Promise<AxiosResponse<IDocsCard>> {
    return await instance.post<IDocsCard>(`/${PATH}/create`, data)
  },
  async updateDocById(data: IDocsCard): Promise<AxiosResponse<IDocsCard>> {
    return await instance.put<IDocsCard>(`/${PATH}/${data.id}`, data)
  }
}
