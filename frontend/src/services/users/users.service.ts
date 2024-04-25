import { instance } from '../../api/api.interceptor'
import { IUser } from './users.interface'

const PATH = 'users'

export const UserService = {
  async getCurrentUser() {
    const { data } = await instance.get<IUser>(`/${PATH}/current`)
    return data
  },
  async updateCurrentUser(userData: Partial<IUser>) {
    const { data } = await instance.put<IUser>(
      `/${PATH}/current/update`,
      userData
    )
    return data
  },
  async getUsers() {
    const { data } = await instance.get<IUser[]>(`/${PATH}`)
    return data
  },
  async updateUserById(userData: Partial<IUser>) {
    const { data } = await instance.put<IUser>(
      `/${PATH}/${userData.id}/update`,
      userData
    )
    return data
  }
}
