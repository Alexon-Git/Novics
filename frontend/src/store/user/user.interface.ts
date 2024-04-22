import { IUser } from "../../services/users/users.interface"

export interface IInitialState {
  user: IUser | null
  token: string | null
  isLoading: boolean
}