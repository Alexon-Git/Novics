import { api } from '../api'
import { Endpoints } from '../endpoints'
import {
  ISignInRequest,
  ISignUpRequest,
  IUser,
  IUserResponse
} from './auth.interface'

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<IUserResponse, ISignInRequest>({
      query: (userData) => ({
        url: Endpoints.AUTH.SIGNIN,
        method: 'POST',
        body: userData
      })
    }),
    signUp: builder.mutation<IUserResponse, ISignUpRequest>({
      query: (userData) => ({
        url: Endpoints.AUTH.SIGNUP,
        method: 'POST',
        body: userData
      })
    }),
    emailConfirmation: builder.mutation<IUser, string>({
      query: (userData) => ({
        url: Endpoints.AUTH.EMAILCONFIRMATION,
        method: 'POST',
        body: userData
      })
    })
  })
})

export const {
  useSignInMutation,
  useSignUpMutation,
  useEmailConfirmationMutation
} = authApi

export const {
  endpoints: { signIn, signUp, emailConfirmation }
} = authApi
