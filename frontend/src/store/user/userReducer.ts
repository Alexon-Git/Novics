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
// import { getLocal } from '../../utils/getLocal'

const initialState: IInitialState = {
  // user: getLocal('user'),
  // token: localStorage.getItem('token'),
  user: {
    id: 21312,
    first_name: 'Иван',
    last_name: 'Иванов',
    patronymic: 'Иванович',
    email: 'email@email.com',
    town: 'Новосибирск',
    UTC: '',
    role: 'user',
    is_active: true,
  },
  token: 'wqeqwdqwd123',
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
        state.token = null
        state.error = payload as ValidationErrors
      })
      .addCase(signin.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signin.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.error = null
        state.token = payload.auth_token
      })
      .addCase(signin.rejected, (state, { payload }) => {
        state.isLoading = false
        state.user = null
        state.token = null
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
      .addCase(verifyOtp.fulfilled, (state) => {
        state.isLoading = false
        state.error = null
        state.user ? (state.user.is_active = true) : null
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
        localStorage.setItem('user', JSON.stringify(state.user))
        state.error = null
      })
      .addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.isLoading = false
        state.user = null
        state.token = null
        state.error = payload
      })
      .addCase(updateCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload
        localStorage.setItem('user', JSON.stringify(state.user))
        state.error = null
      })
      .addCase(updateCurrentUser.rejected, (state, { payload }) => {
        state.isLoading = false
        state.user = null
        state.token = null
        state.error = payload
      })
  }
})
