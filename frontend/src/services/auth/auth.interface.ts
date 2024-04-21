import { IUser } from '../users/users.interface'

export interface IAuthResponse {
  user: IUser
  token: string
}

export interface ISignUpRequest {
  firstName: string
  lastName: string
  surName: string
  email: string
  password: string
}

export interface ISignInRequest {
  email: string
  password: string
}
