import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IAuthState } from './authReducer.interface'
import { RootStore } from '..'
import { authApi } from '../../services/auth/auth.service'
import { userApi } from '../../services/user/user.service'

const initialState: IAuthState = {
  user: null,
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCred: (state, action: PayloadAction<IAuthState>) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
    },
    logOut: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, action) => {
        state.token = action.payload.token
      })
      .addMatcher(userApi.endpoints.currentUser.matchFulfilled, (state, action) => {
        state.user = action.payload
      })
  }
})

export const { setCred, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootStore) => state.auth.user
export const selectCurrentToken = (state: RootStore) => state.auth.token
