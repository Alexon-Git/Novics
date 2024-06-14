import { IToken } from "./auth.interface"

export const getToken = () => {
  const token = localStorage.getItem('token')
  return token || null
}

export const saveToStorage = (data: IToken) => {
  localStorage.setItem('token', data.token)
}

export const removeFromStorage = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}
