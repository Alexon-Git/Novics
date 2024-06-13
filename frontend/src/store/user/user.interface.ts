import { IUser } from '../../services/users/users.interface'

export interface ValidationErrors {
  message: string
}

export interface IInitialState {
  user: IUser | null
  // token: string | null
  error: null | undefined | ValidationErrors
  isLoading: boolean
}
