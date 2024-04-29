import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  IAuthResponse,
  ISignInRequest,
  ISignUpRequest
} from '../../services/auth/auth.interface'
import { AuthService } from '../../services/auth/auth.service'
import {
  removeFromStorage,
  saveToStorage
} from '../../services/auth/auth.helper'
import { errorCatch } from '../../api/api.helper'
import { IUser } from '../../services/users/users.interface'
import { UserService } from '../../services/users/users.service'
import { AxiosError } from 'axios'
import { ValidationErrors } from './user.interface'

export const signup = createAsyncThunk<
  IAuthResponse,
  ISignUpRequest,
  {
    rejectValue: ValidationErrors
  }
>('auth/signup', async (data, { rejectWithValue }) => {
  try {
    const response = await AuthService.signUp(data)
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

export const signin = createAsyncThunk<
  IAuthResponse,
  ISignInRequest,
  {
    rejectValue: ValidationErrors
  }
>('auth/signin', async (data, { rejectWithValue }) => {
  try {
    const response = await AuthService.signIn(data)
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

export const emailConfirmation = createAsyncThunk<
  IAuthResponse,
  string,
  {
    rejectValue: ValidationErrors
  }
>('auth/emailConfirmation', async (data, { rejectWithValue }) => {
  try {
    const response = await AuthService.emailConfirmation(data)
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

export const checkAuth = createAsyncThunk<
  IAuthResponse,
  void,
  {
    rejectValue: ValidationErrors
  }
>('auth/check-auth', async (_, thunkApi) => {
  try {
    const response = await AuthService.getNewTokens()
    saveToStorage(response.data)
    return response.data
  } catch (err) {
    const error: AxiosError<ValidationErrors> =
      err as AxiosError<ValidationErrors>
    if (!error.response) {
      throw err
    }
    errorCatch(error) === 'jwt expired' ? thunkApi.dispatch(logout()) : null
    return thunkApi.rejectWithValue(error.response.data)
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
