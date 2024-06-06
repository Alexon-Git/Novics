import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  IAuthResponse,
  ISignInRequest,
  ISignUpRequest,
  IToken
} from '../../services/auth/auth.interface'
import { AuthService } from '../../services/auth/auth.service'
import {
  removeFromStorage,
  saveToStorage
} from '../../services/auth/auth.helper'
import { IUser } from '../../services/users/users.interface'
import { UserService } from '../../services/users/users.service'
import { AxiosError } from 'axios'
import { ValidationErrors } from './user.interface'

export const signup = createAsyncThunk<
  IAuthResponse,
  ISignUpRequest
>('auth/signup', async (data, { rejectWithValue }) => {
  try {
    const response = await UserService.createUser(data)
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
  IToken,
  ISignInRequest,
  {
    rejectValue: ValidationErrors
  }
>('auth/signin', async (data, { rejectWithValue }) => {
  try {
    const response = await AuthService.login(data)
    saveToStorage(response.data)
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
  string | number,
  { rejectValue: ValidationErrors }
>('auth/sendOtp', async (id, { rejectWithValue }) => {
  try {
    const response = await UserService.sendOtp(id)
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
  void,
  { id: string | number; code: string | number },
  { rejectValue: ValidationErrors }
>('auth/verifyOtp', async ({ id, code }, { rejectWithValue }) => {
  try {
    const response = await UserService.verifyOtp(id, code)
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
