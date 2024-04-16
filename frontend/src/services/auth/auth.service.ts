import { AxiosPromise } from 'axios'
import { instance } from '../../api/instance'
import { Endpoints } from '../endpoints'
import { ISignInRequest, ITokenResponse } from './auth.interface'

export const AuthService = {
  SignIn: (formData: ISignInRequest): AxiosPromise<ITokenResponse> => {
    return instance.post(Endpoints.AUTH.SIGNIN, formData)
  }
}
