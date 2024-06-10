import { ISignInRequest, ISignUpRequest } from './auth.interface'
import { instance } from '../../api/api.interceptor'
import { IUser } from '../users/users.interface'

const PATH = 'auth'

export const AuthService = {
  async login(userData: ISignInRequest) {
    const response = await instance.post<IUser>(`/${PATH}/signin`, userData)
    return response
  },
  async signup(userData: ISignUpRequest) {
    const response = await instance.post<IUser>(`/${PATH}/signup`, userData)
    return response
  },
  async logout() {
    const response = await instance.delete<void>(`/${PATH}/logout`)
    return response
  },
  async info() {
    const response = await instance.get<IUser>(`/${PATH}/info`)
    return response
  },
  async sendActivate() {
    const response = await instance.post<void>(`/${PATH}/activate`)
    return response
  },
  async verifyActivate(otp_code: string) {
    const response = await instance.put<IUser>(`/${PATH}/activate`, {otp_code: otp_code})
    return response
  }
}
