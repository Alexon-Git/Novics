import { instance } from '../../api/api.interceptor'
import { IUser } from '../users/users.interface'

const PATH = 'role'

export const RoleService = {
  async getUsers() {
    //! user_list
    return await instance.get<IUser[]>(`/${PATH}/list`)
  },
  async getUsersWithFilters(filter: string) {
    //! user_list_with_filters
    return await instance.get<IUser[]>(`/${PATH}/list?filter=${filter}`)
  },
  async setRoleById(data: Partial<IUser>) {
    //! update_user_by_id
    return await instance.put(
      `/${PATH}/set/${data.id}`,
      {
        role: data.role
      }
    )
  },
  async delUserById(id: string | number) {
    //! del_user_by_id
    return await instance.delete<void>(`/${PATH}/${id}`)
  },
}
