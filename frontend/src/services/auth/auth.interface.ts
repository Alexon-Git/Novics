// import { IUser } from '../users/users.interface'

export interface IToken {
  auth_token: string
}

export interface IAuthResponse {
  id: number | string
  email: string
}

export interface ISignUpRequest {
  firstName: string
  lastName: string
  patronymic: string
  email: string
  password: string
}

export interface ISignInRequest {
  email: string
  password: string
}
