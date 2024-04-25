import { createSlice } from '@reduxjs/toolkit'
import { IInitialState } from './user.interface'
import {
  checkAuth,
  emailConfirmation,
  getCurrentUser,
  logout,
  signin,
  signup,
  updateCurrentUser
} from './userActions'
import { getLocal } from '../../utils/getLocal'

const initialState: IInitialState = {
  user: getLocal('user'),
  token: getLocal('token'),
  isLoading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload.user
        state.token = payload.token
      })
      .addCase(signup.rejected, (state) => {
        state.isLoading = false
        state.user = null
        state.token = null
      })
      .addCase(signin.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signin.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload.user
        state.token = payload.token
      })
      .addCase(signin.rejected, (state) => {
        state.isLoading = false
        state.user = null
        state.token = null
      })
      .addCase(emailConfirmation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(emailConfirmation.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.token = payload.token
        state.user = payload.user
      })
      .addCase(emailConfirmation.rejected, (state) => {
        state.isLoading = false
        state.user = null
        state.token = null
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true
      })
      .addCase(checkAuth.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload.user
        state.token = payload.token
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false
        state.user = null
        state.token = null
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false
        state.user = null
        state.token = null
      })
      .addCase(updateCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload
      })
      .addCase(updateCurrentUser.rejected, (state) => {
        state.isLoading = false
        state.user = null
        state.token = null
      })
  }
})
