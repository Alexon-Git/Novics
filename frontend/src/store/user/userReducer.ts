import { createSlice } from '@reduxjs/toolkit'
import { IInitialState, ValidationErrors } from './user.interface'
import {
  getCurrentUser,
  logout,
  sendOtp,
  signin,
  signup,
  updateCurrentUser,
  verifyOtp
} from './userActions'
import { getLocal } from '../../utils/getLocal'
import { removeFromStorage } from '../../services/auth/auth.helper'

const initialState: IInitialState = {
  user: getLocal('user'),
  // token: localStorage.getItem('token'),
  // user: {
  //   id: 21312,
  //   first_name: 'Иван',
  //   last_name: 'Иванов',
  //   patronymic: 'Иванович',
  //   email: 'email@email.com',
  //   town: '',
  //   UTC: '',
  //   role: 'admin',
  //   is_active: true,
  // },
  error: null,
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
        state.user = payload
        state.error = null
        localStorage.setItem('user', JSON.stringify(state.user))
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.isLoading = false
        state.user = null
        state.error = payload as ValidationErrors
      })
      .addCase(signin.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signin.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.error = null
        state.user = payload
      })
      .addCase(signin.rejected, (state, { payload }) => {
        state.isLoading = false
        state.user = null
        state.error = payload
      })
      .addCase(sendOtp.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.isLoading = false
        state.error = null
      })
      .addCase(sendOtp.rejected, (state, { payload }) => {
        state.isLoading = false
        state.error = payload
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verifyOtp.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.error = null
        state.user = payload
      })
      .addCase(verifyOtp.rejected, (state, { payload }) => {
        state.isLoading = false
        state.user ? (state.user.is_active = false) : null
        state.error = payload
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload
        state.error = null
        localStorage.setItem('user', JSON.stringify(payload))
      })
      .addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.isLoading = false
        state.user = null
        state.error = payload
        removeFromStorage()
      })
      .addCase(updateCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload
        state.error = null
      })
      .addCase(updateCurrentUser.rejected, (state, { payload }) => {
        state.isLoading = false
        state.user = null
        state.error = payload
      })
  }
})
