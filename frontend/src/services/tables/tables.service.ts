import { instance } from '../../api/api.interceptor'
import { ITableResponse, ITable } from './tables.inteface'
const PATH = 'tables'

export const TablesService = {
  async getTables() {
    return await instance.get<ITableResponse[]>(`/${PATH}`)
  },
  async getTablesWithLimit(limit: string | number) {
    return await instance.get<ITableResponse[]>(`/${PATH}?_limit=${limit}`)
  },
  async createTable(data: FormData) {
    return await instance.post<ITableResponse>(`/${PATH}/my`, data)
  },
  async addNoteToTable(data: Partial<ITable>, id: string | number) {
    return await instance.post<ITableResponse>(
      `/${PATH}/${id}/notes/add`,
      data
    )
  },
  async patchNoteById(data: Partial<ITable>, tableId: string | number, noteId: string | number) {
    return await instance.patch<ITableResponse>(
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
