export interface IUser {
  id: string | number
  first_name: string
  last_name: string
  patronymic: string
  email: string
  role?: string
  town?: string | null
  // country: string | null
  UTC?: string | null
  is_active?: boolean
}