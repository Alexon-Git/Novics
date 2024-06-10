import { IUser } from '../../services/users/users.interface'

export interface ValidationErrors {
  email?: string[]
  password?: string[]
  non_field_errors?: string[]
}

export interface IInitialState {
  user: IUser | null
  // token: string | null
  error: null | undefined | ValidationErrors
  isLoading: boolean
}
