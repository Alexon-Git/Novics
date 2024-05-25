import axios from 'axios'
import { IAuthResponse, ISignInRequest, ISignUpRequest } from './auth.interface'
import { instance } from '../../api/api.interceptor'

const BASEURL = 'http://novis.ddns.net/api/v1/'
const PATH = 'users'

export const AuthService = {
  async signUp(userData: ISignUpRequest) {
    const response = await instance.post<IAuthResponse>(
      `/${PATH}`,
      userData
    )
    return response
  },
  async signIn(userData: ISignInRequest) {
    const response = await instance.post<IAuthResponse>(
      `/auth/token/login/`,
      userData
    )
    return response
  },
  async emailConfirmation(userData: string) {
    const response = await instance.post<IAuthResponse>(
      `/${PATH}/emailConfirmation`,
      userData
    )
    return response
  },
  async getNewTokens() {
    const response = await axios.get<IAuthResponse>(
      `${BASEURL}/${PATH}refresh`,
      {
        withCredentials: true
      }
    )
    return response
  },
  async logout() {
    const response = await instance.post(`/${PATH}/logout`)
    return response
  }
}
