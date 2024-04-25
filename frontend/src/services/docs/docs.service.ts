import { IDocsCard } from '../../types/section.interface'
import { instance } from '../../api/api.interceptor'
import { IDoc } from './docs.interface'

const PATH = 'docs'

export const DocsService = {
  async getDocs() {
    const { data } = await instance.get<IDocsCard[]>(`/${PATH}`)
    return data
  },
  async getDocsWithLimit(limit: string | number) {
    const { data } = await instance.get<IDocsCard[]>(`/${PATH}?_limit=${limit}`)
    return data
  },
  async createDoc(userData: IDoc) {
    const { data } = await instance.post<IDocsCard>(`/${PATH}/create`, userData)
    return data
  },
  async updateDocById(userData: IDocsCard) {
    const { data } = await instance.put<IDocsCard>(
      `/${PATH}/${userData.id}`,
      userData
    )
    return data
  }
}
