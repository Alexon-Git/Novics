import { instance } from '../../api/api.interceptor'
// import { IAuthResponse, ISignUpRequest } from '../auth/auth.interface'
import { IUser } from './users.interface'

const PATH = 'user'

export const UserService = {
  async getUsers() {
    //! user_list
    return await instance.get<IUser[]>(`/${PATH}/list`)
  },
  async getUsersWithFilters(filter: string) {
    //! user_list_with_filters
    return await instance.get<IUser[]>(`/${PATH}/list?filter=${filter}`)
  },
  async getCurrentUser() {
    //! get_current_user
    return await instance.get<IUser>(`/${PATH}/me`)
  },
  async updateCurrentUser(data: Partial<IUser>) {
    //! user_me_update
    return await instance.patch<IUser>(`/${PATH}/me`, data)
  },
  async getUserById(id: string | number) {
    //! get_user_by_id
    return await instance.get<IUser>(`/${PATH}/${id}`)
  },
  async updateUserById(data: Partial<IUser>) {
    //! update_user_by_id
    return await instance.patch<IUser>(
      `/${PATH}/${data.id}`,
      data
    )
  },
  async setRoleById(data: Partial<IUser>) {
    //! update_user_by_id
    return await instance.patch<IUser>(
      `/${PATH}/${data.id}`,
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
