import { ERole } from "../../hooks/role.enum"

export interface IUser {
  id: string | number
  firstName: string
  lastName: string
  surName: string
  email: string
  city: string | null
  country: string | null
  timeZone: string | null
  role: ERole
  isEmailConfirmed: boolean
  isCheckedByAdmin: boolean
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

export interface IUserResponse {
  user: IUser
  token: string
}
