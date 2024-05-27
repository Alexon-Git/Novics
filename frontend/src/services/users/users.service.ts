import { instance } from '../../api/api.interceptor'
import { IAuthResponse, ISignUpRequest } from '../auth/auth.interface'
import { IUser } from './users.interface'

const PATH = 'users'

export const UserService = {
  async getUsers() {
    //! user_list
    const response = await instance.get<IUser[]>(`/${PATH}/`)
    return response
  },
  async createUser(userData: ISignUpRequest) {
    //! user_create
    const response = await instance.post<IAuthResponse>(`/${PATH}/`, userData)
    return response
  },
  async getCurrentUser() {
    //! user_me_read
    const response = await instance.get<IUser>(`/${PATH}/me/`)
    return response
  },
  async updateCurrentUser(userData: Partial<IUser>) {
    //! user_me_update
    const response = await instance.put<IUser>(`/${PATH}/me/`, userData)
    return response
  },
  async getUserById(id: string | number) {
    //! get_user_by_id
    const response = await instance.get<IUser>(`/${PATH}/${id}/`)
    return response
  },
  async updateUserById(userData: Partial<IUser>) {
    //! update_user_by_id
    const response = await instance.put<IUser>(
      `/${PATH}/${userData.id}/`,
      userData
    )
    return response
  },
  async patchUserById(userData: Partial<IUser>) {
    //! patch_user_by_id
    const response = await instance.patch<IUser>(
      `/${PATH}/${userData.id}/`,
      userData
    )
    return response
  },
  async delUserById(id: string | number) {
    //! del_user_by_id
    const response = await instance.delete<IUser>(`/${PATH}/${id}/`)
    return response
  },
  async sendOtp(id: string | number) {
    //! user_send_otp
    const response = await instance.post<void>(`/${PATH}/${id}/send_otp/`)
    return response
  },
  async verifyOtp(id: string | number, code: number | string) {
    //! users_verify_otp
    const response = await instance.post<void>(`/${PATH}/${id}/verify_otp/`, code)
    return response
  }
}
