import axios, { AxiosResponse } from 'axios'
import { IAuthResponse, ISignInRequest, ISignUpRequest } from './auth.interface'
import { instance } from '../../api/api.interceptor'

const PATH = 'auth'

export const AuthService = {
  async signUp(data: ISignUpRequest): Promise<AxiosResponse<IAuthResponse>> {
    return await instance.post<IAuthResponse>(`/${PATH}/signUp`, data)
  },
  async signIn(data: ISignInRequest): Promise<AxiosResponse<IAuthResponse>> {
    return await instance.post<IAuthResponse>(`/${PATH}/signIn`, data)
  },
  async emailConfirmation(data: string): Promise<AxiosResponse<IAuthResponse>> {
    return await instance.post<IAuthResponse>(`/${PATH}/emailConfirmation`, data)
  },
  async getNewTokens(): Promise<AxiosResponse<IAuthResponse>> {
    return await axios.get<IAuthResponse>(
      `${process.env.NODE_ENV ? '' : 'http://localhost:8000/api'}/${PATH}/refresh`,
      {
        withCredentials: true
      }
    )
  },
  async logout(): Promise<void> {
    return await instance.post(`/${PATH}/logout`)
  }
}
