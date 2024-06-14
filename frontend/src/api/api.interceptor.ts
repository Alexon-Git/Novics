import axios from 'axios'
// import { getToken } from '../services/auth/auth.helper'
// import { errorCatch } from './api.helper'
// import { AuthService } from '../services/auth/auth.service'

export const instance = axios.create({
  baseURL: 'https://novis.ddns.net/api/',
  withCredentials: true
})

// instance.interceptors.request.use(async (config) => {
//   const token = getToken()
//   config.headers && token
//     ? (config.headers.Authorization = `Token Bearer ${token}`)
//     : null
//   return config
// })

// instance.interceptors.response.use(
//   (config) => config,
//   async (error) => {
//     const originalRequest = error.config
//     if (
//       (error.response.status === 401 ||
//         errorCatch(error) === 'jwt expired' ||
//         errorCatch(error) === 'jwt must be provided') &&
//       error.config &&
//       !error.config._isRetry
//     ) {
//       originalRequest._isRetry = true
//       try {
//         await AuthService.getNewTokens()
//         return instance.request(originalRequest)
//       } catch (error) {
//         errorCatch(error) === 'jwt expired' ? null : null
//         removeFromStorage()
//       }
//     }
//     throw error
//   }
// )
