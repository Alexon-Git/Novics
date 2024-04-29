import { instance } from '../../api/api.interceptor'
import { IUser } from './users.interface'

const PATH = 'users'

export const UserService = {
  async getCurrentUser() {
    const response = await instance.get<IUser>(`/${PATH}/current`)
    return response
  },
  async updateCurrentUser(userData: Partial<IUser>) {
    const response = await instance.put<IUser>(
      `/${PATH}/current/update`,
      userData
    )
    return response
  },
  async getUsers() {
    const response = await instance.get<IUser[]>(`/${PATH}`)
    return response
  },
  async updateUserById(userData: Partial<IUser>) {
    const response = await instance.put<IUser>(
      `/${PATH}/${userData.id}/update`,
      userData
    )
    return response
  }
}
