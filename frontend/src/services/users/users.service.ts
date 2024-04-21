import { AxiosResponse } from 'axios'
import { instance } from '../../api/api.interceptor'
import { IUser } from './users.interface'

const PATH = 'users'

export const UserService = {
  async getCurrentUser(): Promise<AxiosResponse<IUser>> {
    return await instance.get<IUser>(`/${PATH}/current`)
  },
  async updateCurrentUser(data: Partial<IUser>): Promise<AxiosResponse<IUser>> {
    return await instance.put<IUser>(`/${PATH}/current/update`, data)
  },
  async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return await instance.get<IUser[]>(`/${PATH}`)
  },
  async updateUserById(id: string | number, data: Partial<IUser>): Promise<AxiosResponse<IUser>> {
    return instance.put<IUser>(`/${PATH}/${id}/update`, data)
  },
}
