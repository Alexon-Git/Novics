import { instance } from '../../api/api.interceptor'
// import { IAuthResponse, ISignUpRequest } from '../auth/auth.interface'
import { IUser } from './users.interface'

const PATH = 'role'

export const UserService = {
  async getUsers() {
    //! user_list
    return await instance.get<IUser[]>(`/${PATH}/list`)
  },
  async updateCurrentUser(userData: Partial<IUser>) {
    //! user_me_update
    return await instance.put<IUser>(`/${PATH}/me`, userData)
  },
  async updateUserById(data: Partial<IUser>) {
    //! update_user_by_id
    return await instance.put<void>(
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
