import { IUser } from "../../services/users/users.interface"

export interface ValidationErrors {
  errorMessage: string
  field_errors: Record<string, string>
}

export interface IInitialState {
  user: IUser | null
  token: string | null
  error: string | null | undefined
  isLoading: boolean
}