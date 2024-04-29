import { IAuthResponse } from './auth.interface'

export const getToken = () => {
  const token = localStorage.getItem('token')
  return token || null
}

export const saveToStorage = (data: IAuthResponse) => {
  localStorage.setItem('user', JSON.stringify(data.user))
  localStorage.setItem('token', data.token)
}

export const removeFromStorage = () => {
  localStorage.removItem('user')
  localStorage.removeItem('token')
}
