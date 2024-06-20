import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  ISignInRequest,
  ISignUpRequest,
} from '../../services/auth/auth.interface'
import { AuthService } from '../../services/auth/auth.service'
import {
  removeFromStorage,
} from '../../services/auth/auth.helper'
import { IUser } from '../../services/users/users.interface'
import { UserService } from '../../services/users/users.service'
import { AxiosError } from 'axios'
import { ValidationErrors } from './user.interface'

export const signup = createAsyncThunk<
  IUser,
  ISignUpRequest
>('auth/signup', async (data, { rejectWithValue }) => {
  try {
    const response = await AuthService.signup(data)
    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
  } catch (err) {
    const error: AxiosError<ValidationErrors> =
      err as AxiosError<ValidationErrors>
    if (!error.response) {
      throw err
    }
    return rejectWithValue(error.response.data)
  }
})

export const signin = createAsyncThunk<
  IUser,
  ISignInRequest,
  {
    rejectValue: ValidationErrors
  }
>('auth/signin', async (data, { rejectWithValue }) => {
  try {
    const response = await AuthService.login(data)
    localStorage.setItem('user', JSON.stringify(response.data))
    // saveToStorage(response.data)
    return response.data
  } catch (err) {
    const error: AxiosError<ValidationErrors> =
      err as AxiosError<ValidationErrors>
    if (!error.response) {
      throw err
    }
    return rejectWithValue(error.response.data)
  }
})

export const sendOtp = createAsyncThunk<
  void,
  void,
  { rejectValue: ValidationErrors }
>('auth/sendOtp', async (_, { rejectWithValue }) => {
  try {
    const response = await AuthService.sendActivate()
    return response.data
  } catch (err) {
    const error: AxiosError<ValidationErrors> =
      err as AxiosError<ValidationErrors>
    if (!error.response) {
      throw err
    }
    return rejectWithValue(error.response.data)
  }
})

export const verifyOtp = createAsyncThunk<
  IUser,
  { otp_code: string },
  { rejectValue: ValidationErrors }
>('auth/verifyOtp', async ({ otp_code }, { rejectWithValue }) => {
  try {
    const response = await AuthService.verifyActivate(otp_code)
    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
  } catch (err) {
    const error: AxiosError<ValidationErrors> =
      err as AxiosError<ValidationErrors>
    if (!error.response) {
      throw err
    }
    return rejectWithValue(error.response.data)
  }
})

export const logout = createAsyncThunk<
  void,
  void,
  {
    rejectValue: ValidationErrors
  }
>('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await AuthService.logout()
    removeFromStorage()
    location.reload()
    return response.data
  } catch (err) {
    const error: AxiosError<ValidationErrors> =
      err as AxiosError<ValidationErrors>
    if (!error.response) {
      throw err
    }
    return rejectWithValue(error.response.data)
  }
})

export const getCurrentUser = createAsyncThunk<
  IUser,
  void,
  {
    rejectValue: ValidationErrors
  }
>('/users/current', async (_, { rejectWithValue }) => {
  try {
    const response = await UserService.getCurrentUser()
    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
  } catch (err) {
    const error: AxiosError<ValidationErrors> =
      err as AxiosError<ValidationErrors>
    if (!error.response) {
      throw err
    }
    return rejectWithValue(error.response.data)
  }
})

export const updateCurrentUser = createAsyncThunk<
  IUser,
  Partial<IUser>,
  {
    rejectValue: ValidationErrors
  }
>('/users/current/update', async (data, { rejectWithValue }) => {
  try {
    const response = await UserService.updateCurrentUser(data)
    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
  } catch (err) {
    const error: AxiosError<ValidationErrors> =
      err as AxiosError<ValidationErrors>
    if (!error.response) {
      throw err
    }
    return rejectWithValue(error.response.data)
  }
})
