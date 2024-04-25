import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  IAuthResponse,
  ISignInRequest,
  ISignUpRequest
} from '../../services/auth/auth.interface'
import { AuthService } from '../../services/auth/auth.service'
import { removeFromStorage, saveToStorage } from '../../services/auth/auth.helper'
import { errorCatch } from '../../api/api.helper'
import { IUser } from '../../services/users/users.interface'
import { UserService } from '../../services/users/users.service'

export const signup = createAsyncThunk<IAuthResponse, ISignUpRequest>(
  'auth/signup',
  async (data, thunkApi) => {
    try {
      const response = await AuthService.signUp(data)
      saveToStorage(response)
      return response
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const signin = createAsyncThunk<IAuthResponse, ISignInRequest>(
  'auth/signin',
  async (data, thunkApi) => {
    try {
      const response = await AuthService.signIn(data)
      saveToStorage(response)
      return response
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const emailConfirmation = createAsyncThunk<IAuthResponse, string>(
  'auth/emailConfirmation',
  async (data, thunkApi) => {
    try {
      const response = await AuthService.emailConfirmation(data)
      saveToStorage(response)
      return response
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const logout = createAsyncThunk<void, void>('auth/logout', async () => {
  await AuthService.logout()
  removeFromStorage()
})

export const checkAuth = createAsyncThunk<IAuthResponse, void>(
  'auth/check-auth',
  async (_, thunkApi) => {
    try {
      const response = await AuthService.getNewTokens()
      saveToStorage(response)
      return response
    } catch (error) {
      errorCatch(error) === 'jwt expired' ? thunkApi.dispatch(logout()) : null
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const getCurrentUser = createAsyncThunk<IUser, void>(
  '/users/current',
  async (_, thunkApi) => {
    try {
      const response = await UserService.getCurrentUser()
      localStorage.setItem('user', JSON.stringify(response))
      return response
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const updateCurrentUser = createAsyncThunk<IUser, IUser>(
  '/users/current/update',
  async (data, thunkApi) => {
    try {
      const response = await UserService.updateCurrentUser(data)
      localStorage.setItem('user', JSON.stringify(response))
      return response
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)
