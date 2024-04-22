export interface IUser {
  id: string | number
  firstName: string
  lastName: string
  surName: string
  email: string
  city: string | null
  country: string | null
  timeZone: string | null
  role: string
  isEmailConfirmed: boolean
  isCheckedByAdmin: boolean
}