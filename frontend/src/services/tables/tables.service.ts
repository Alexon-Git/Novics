import { instance } from '../../api/api.interceptor'

const PATH = 'tables'

export const TablesService = {
  async getTables() {
    return await instance.get<IDocsCard[]>(`/${PATH}`)
  },
  async getTablesWithLimit(limit: string | number) {
    return await instance.get<IDocsCard[]>(`/${PATH}?_limit=${limit}`)
  },
  async createTable(data) {
    return await instance.post(`/${PATH}/my`, data)
  },
  async addNoteToTable(data: IDocsCard, id: string | number) {
    return await instance.post<IDocsCard>(
      `/${PATH}/${id}/notes/add`,
      data
    )
  },
  async patchNoteById(data: Partial<IDocsCard>, tableId: string | number, noteId: string | number) {
    return await instance.patch<IDocsCard>(
      `/${PATH}/${tableId}/notes/${noteId}`,
      data
    )
  },
  // async delDocById(userData: IDocsCard) {
  //   return await instance.delete<void>(
  //     `/${PATH}/${userData.id}`
  //   )
  // },
}
