import { IDocsCard } from '../../types/section.interface'
import { instance } from '../../api/api.interceptor'
import { IDoc } from './docs.interface'

const PATH = 'docs'

export const DocsService = {
  async getDocs() {
    return await instance.get<IDocsCard[]>(`/${PATH}`)
  },
  async getDocsWithLimit(limit: string | number) {
    return await instance.get<IDocsCard[]>(`/${PATH}?_limit=${limit}`)
  },
  async createDoc(userData: IDoc) {
    return await instance.post<IDocsCard>(`/${PATH}`, userData)
  },
  async updateDocById(userData: IDocsCard) {
    return await instance.put<IDocsCard>(
      `/${PATH}/${userData.id}`,
      userData
    )
  },
  async patchDocById(userData: Partial<IDocsCard>) {
    return await instance.put<IDocsCard>(
      `/${PATH}/${userData.id}`,
      userData
    )
  },
  async delDocById(userData: IDocsCard) {
    return await instance.delete<void>(
      `/${PATH}/${userData.id}`
    )
  },
}
