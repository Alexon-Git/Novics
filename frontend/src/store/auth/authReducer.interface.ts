import { IUser } from '../../services/auth/auth.interface'

export interface IAuthState {
  user: IUser | null
  token: string | null
}
