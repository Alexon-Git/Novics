import { instance } from '../../api/api.interceptor'
import { ITableResponse, ITable } from './tables.inteface'
const PATH = 'tables'

export const TablesService = {
  async getTables() {
    return await instance.get<ITableResponse[]>(`/${PATH}/list`)
  },
  async getTablesWithLimit(limit: string | number) {
    return await instance.get<ITableResponse[]>(`/${PATH}/list?_limit=${limit}`)
  },
  async getTablesWithFilter(filter: string) {
    return await instance.get<ITableResponse[]>(`/${PATH}/list?filter=${filter}`)
  },
  async getMyTablesWithFilter(filter: string) {
    return await instance.get<ITableResponse[]>(`/${PATH}/my?filter=${filter}`)
  },
  async createTable(data: FormData) {
    return await instance.post<ITableResponse>(`/${PATH}/my`, data)
  },
  async addNoteToTable(data: Partial<ITable>) {
    return await instance.post<ITableResponse>(
      `/${PATH}/${data.id}/notes/add`,
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
