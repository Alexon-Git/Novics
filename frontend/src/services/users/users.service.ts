import { instance } from '../../api/api.interceptor'
import { IAuthResponse, ISignUpRequest } from '../auth/auth.interface'
import { IUser } from './users.interface'

const PATH = 'users'

export const UserService = {
  async getUsers() {
    //! user_list
    return await instance.get<IUser[]>(`/${PATH}/`)
  },
  async createUser(userData: ISignUpRequest) {
    //! user_create
    return await instance.post<IAuthResponse>(`/${PATH}/`, userData)
  },
  async getCurrentUser() {
    //! user_me_read
    return await instance.get<IUser>(`/${PATH}/me/`)
  },
  async updateCurrentUser(userData: Partial<IUser>) {
    //! user_me_update
    return await instance.put<IUser>(`/${PATH}/me/`, userData)
  },
  async getUserById(id: string | number) {
    //! get_user_by_id
    return await instance.get<IUser>(`/${PATH}/${id}/`)
  },
  async updateUserById(userData: Partial<IUser>) {
    //! update_user_by_id
    return await instance.put<IUser>(
      `/${PATH}/${userData.id}/`,
      userData
    )
  },
  async patchUserById(userData: Partial<IUser>) {
    //! patch_user_by_id
    return await instance.patch<IUser>(
      `/${PATH}/${userData.id}/`,
      userData
    )
  },
  async delUserById(id: string | number) {
    //! del_user_by_id
    return await instance.delete<void>(`/${PATH}/${id}/`)
  },
  async sendOtp(id: string | number) {
    //! user_send_otp
    return await instance.post<void>(`/${PATH}/${id}/send_otp/`)
  },
  async verifyOtp(id: string | number, code: number | string) {
    //! users_verify_otp
    return await instance.post<void>(`/${PATH}/${id}/verify_otp/`, code)
  }
}
