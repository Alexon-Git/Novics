// import { IUser } from '../users/users.interface'

export interface IToken {
  auth_token: string
}

export interface IAuthResponse {
  id: number | string
  first_name: string,
  last_name: string,
  patronymic: string,
  email: string
}

export interface ISignUpRequest {
  first_name: string
  last_name: string
  patronymic: string
  email: string
  password: string
}

export interface ISignInRequest {
  email: string
  password: string
}
