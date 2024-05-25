import { IAuthResponse, ISignInRequest } from './auth.interface'
import { instance } from '../../api/api.interceptor'

const PATH = 'auth'

export const AuthService = {
  async login(userData: ISignInRequest) {
    const response = await instance.post<IAuthResponse>(
      `/${PATH}/token/login/`,
      userData
    )
    return response
  },
  async logout() {
    const response = await instance.post(`/${PATH}/token/logout`)
    return response
  }
}
