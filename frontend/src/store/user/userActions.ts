import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  IAuthResponse,
  ISignInRequest,
  ISignUpRequest
} from '../../services/auth/auth.interface'
import { AuthService } from '../../services/auth/auth.service'
import { removeFromStorage } from '../../services/auth/auth.helper'
import { errorCatch } from '../../api/api.helper'
import { UserService } from '../../services/users/users.service'
import { IUser } from '../../services/users/users.interface'

export const signup = createAsyncThunk<IAuthResponse, ISignUpRequest>(
  'auth/signup',
  async (data, thunkApi) => {
    try {
      const response = await AuthService.signUp(data)
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
      return response.data
    } catch (error) {
      errorCatch(error) === 'jwt expired' ? thunkApi.dispatch(logout()) : null
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const getCurrentUser = createAsyncThunk<IAuthResponse, void>(
  '/users/current',
  async (data, thunkApi) => {
    try {
      const response = await UserService.getCurrentUser()
      return response
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const updateCurrentUser = createAsyncThunk<IAuthResponse, IUser>(
  '/users/current/update',
  async (data, thunkApi) => {
    try {
      const response = await UserService.updateCurrentUser(data)
      return response
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)
