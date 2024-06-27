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
import { Bounce, toast } from 'react-toastify'
import Cookies from 'js-cookie'

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
  //   is_active: true
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
        toast.success(`Успешная регистрация ${state.user.first_name} ${state.user.last_name}!`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce
        })
      })
      .addCase(signup.rejected, (state, { payload }) => {
        Cookies.remove('csrftoken')
        Cookies.remove('session_id')
        state.isLoading = false
        state.user = null
        state.error = payload as ValidationErrors
        toast.error(`Произошла ошибка регистрации ${state.error}!`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce
        })
      })
      .addCase(signin.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signin.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.error = null
        state.user = payload
        toast.success(`Успешная авторизация ${state.user.first_name} ${state.user.last_name}!`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce
        })
      })
      .addCase(signin.rejected, (state, { payload }) => {
        Cookies.remove('csrftoken')
        Cookies.remove('session_id')
        state.isLoading = false
        state.user = null
        state.error = payload
        toast.error(`Ошибка авторизации ${state.error}!`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce
        })
      })
      .addCase(sendOtp.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.isLoading = false
        state.error = null
        toast.info(`На вашу почту отправлен код для подтерждения!`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce
        })
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
        toast.success(`Ваш email успешно подтвержден!`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce
        })
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
      .addCase(getCurrentUser.rejected, (state) => {
        Cookies.remove('csrftoken')
        Cookies.remove('session_id')
        state.isLoading = false
        state.user = null
        state.error = null
        removeFromStorage()
      })
      .addCase(updateCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload
        state.error = null
        toast.success(`Ваши данные успешно изменены!`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce
        })
      })
      .addCase(updateCurrentUser.rejected, (state, { payload }) => {
        Cookies.remove('csrftoken')
        Cookies.remove('session_id')
        state.isLoading = false
        state.user = null
        state.error = payload
        toast.error(state.error?.message, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce
        })
      })
  }
})
