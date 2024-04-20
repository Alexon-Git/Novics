import { api } from '../api'
import { IUser } from '../auth/auth.interface'
import { Endpoints } from '../endpoints'

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    currentUser: builder.query<IUser, void>({
      query: () => ({
        url: Endpoints.USER.CURRENTUSER,
        method: 'GET'
      })
    }),
    getUsers: builder.query<IUser[], void>({
      query: () => ({
        url: Endpoints.USER.ALL,
        method: 'GET'
      })
    }),
    updateUser: builder.mutation<IUser, void>({
      query: () => ({
        url: Endpoints.USER.UPDATE,
        method: 'PUT'
      })
    }),
    updateUserById: builder.mutation<IUser, IUser>({
      query: (userData) => ({
        url: Endpoints.USER.UPDATE + '/' + userData.id,
        method: 'PUT',
        body: userData
      })
    })
  })
})

export const {
  useCurrentUserQuery,
  useUpdateUserMutation,
  useUpdateUserByIdMutation
} = userApi

export const {
  endpoints: { currentUser, getUsers, updateUser, updateUserById }
} = userApi
