import axios from 'axios'
import { IAuthResponse, ISignInRequest, ISignUpRequest } from './auth.interface'
import { instance } from '../../api/api.interceptor'

const BASEURL = 'http://localhost:8000/api'
const PATH = 'auth'

export const AuthService = {
  async signUp(userData: ISignUpRequest) {
    const { data } = await instance.post<IAuthResponse>(
      `/${PATH}/signUp`,
      userData
    )
    return data
  },
  async signIn(userData: ISignInRequest) {
    const { data } = await instance.post<IAuthResponse>(
      `/${PATH}/signIn`,
      userData
    )
    return data
  },
  async emailConfirmation(userData: string) {
    const { data } = await instance.post<IAuthResponse>(
      `/${PATH}/emailConfirmation`,
      userData
    )
    return data
  },
  async getNewTokens() {
    const { data } = await axios.get<IAuthResponse>(
      `${BASEURL}/${PATH}refresh`,
      {
        withCredentials: true
      }
    )
    return data
  },
  async logout() {
    const { data } = await instance.post(`/${PATH}/logout`)
    return data
  }
}
