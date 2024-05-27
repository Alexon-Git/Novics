import { createSlice } from '@reduxjs/toolkit'
import { IInitialState } from './user.interface'
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

const initialState: IInitialState = {
  user: getLocal('user'),
  token: getLocal('token'),
  // user: {
  //   id: 21312,
  //   firstName: 'Иван',
  //   lastName: 'Иванов',
  //   surName: 'Иванович',
  //   email: 'email@email.com',
  //   city: 'Новосибирск',
  //   country: 'Россия',
  //   timeZone: '',
  //   role: 'admin',
  //   isEmailConfirmed: true,
  //   isCheckedByAdmin: true
  // },
  // token: 'wqeqwdqwd123',
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
        state.error = payload
      })
      .addCase(signin.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signin.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.token = payload.auth_token
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.token = null
        if (action.payload) {
          state.error = action.payload.errorMessage
        } else {
          state.error = action.error.message
        }
      })
      .addCase(sendOtp.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.isLoading = false
        if (action.payload) {
          state.error = action.payload.errorMessage
        } else {
          state.error = action.error.message
        }
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.isLoading = false
        state.user ? (state.user.is_active = true) : null
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false
        state.user ? (state.user.is_active = false) : null
        if (action.payload) {
          state.error = action.payload.errorMessage
        } else {
          state.error = action.error.message
        }
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.token = null
        if (action.payload) {
          state.error = action.payload.errorMessage
        } else {
          state.error = action.error.message
        }
      })
      .addCase(updateCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload
      })
      .addCase(updateCurrentUser.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.token = null
        if (action.payload) {
          state.error = action.payload.errorMessage
        } else {
          state.error = action.error.message
        }
      })
  }
})
