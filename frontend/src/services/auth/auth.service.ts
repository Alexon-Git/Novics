import axios from 'axios'
import { IAuthResponse, ISignInRequest, ISignUpRequest } from './auth.interface'
import { instance } from '../../api/api.interceptor'

const BASEURL = 'http://localhost:8000/api'
const PATH = 'auth'

export const AuthService = {
  async signUp(userData: ISignUpRequest) {
    const response = await instance.post<IAuthResponse>(
      `/${PATH}/signUp`,
      userData
    )
    return response
  },
  async signIn(userData: ISignInRequest) {
    const response = await instance.post<IAuthResponse>(
      `/${PATH}/signIn`,
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
