import { instance } from '../../api/api.interceptor'
import {
  ITableResponse,
  ITable,
  INoteRequest,
  IModeratorTable,
  IGenTable
} from './tables.inteface'
const PATH = 'tables'

export const TablesService = {
  async getGenTable() {
    return await instance.get<IGenTable>(`/${PATH}/gen`)
  },
  async getTables() {
    return await instance.get<ITableResponse[]>(`/${PATH}/list`)
  },
  async getTablesWithLimit(limit: string | number) {
    return await instance.get<IModeratorTable[]>(
      `/${PATH}/list?_limit=${limit}`
    )
  },
  async getTablesWithFilterAndSort({filter, sort} : {filter: string, sort: string}) {
    return await instance.get<IModeratorTable[]>(
      `/${PATH}/list?filter=${filter}&sort=${sort}`
    )
  },
  async getTablesWithFilter(filter: string) {
    return await instance.get<IModeratorTable[]>(
      `/${PATH}/list?filter=${filter}`
    )
  },
  async getMyTablesWithFilterAndSort({filter, sort} : {filter: string, sort: string}) {
    return await instance.get<ITableResponse[]>(`/${PATH}/my?filter=${filter}&sort=${sort}`)
  },
  async createTable(data: FormData) {
    return await instance.post<ITableResponse>(`/${PATH}/my`, data)
  },
  async patchTable(data: { id: string | number; status: boolean }) {
    return await instance.patch<ITableResponse[]>(`/${PATH}/${data.id}`, {
      approved: data.status
    })
  },
  async addNoteToTable(data: Partial<ITable>) {
    return await instance.post<ITableResponse>(
      `/${PATH}/${data.id}/notes/add`,
      data
    )
  },
  async patchNoteById(data: Partial<INoteRequest>) {
    return await instance.patch<ITableResponse>(
      `/${PATH}/${data.tableId}/notes/${data.noteId}`,
      {
        university: data.university,
        country: data.country,
        education_type: data.education_type,
        education_form: data.education_form,
        education_level: data.education_level,
        students_amount: data.students_amount
      }
    )
  },
  async delNote(data: Partial<INoteRequest>) {
    return await instance.delete<ITableResponse>(
      `/${PATH}/${data.tableId}/notes/${data.noteId}`
    )
  }
  // async delDocById(userData: IDocsCard) {
  //   return await instance.delete<void>(
  //     `/${PATH}/${userData.id}`
  //   )
  // },
}
