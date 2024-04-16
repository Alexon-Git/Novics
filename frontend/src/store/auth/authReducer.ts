import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IAuthState, IProfile } from './authReducer.interface'

const initialState: IAuthState = {
  authData: {
    accessToken: null,
    isLoading: false,
    error: null
  },
  profileData: {
    profile: {
      profileInfo: null,
      role: null
    },
    isLoading: false,
    error: null
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInStart: (state): IAuthState => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: true
      }
    }),
    signInSuccess: (state, action: PayloadAction<string>): IAuthState => ({
      ...state,
      authData: {
        ...state.authData,
        accessToken: action.payload,
        isLoading: false,
        error: null
      }
    }),
    signInFailure: (state, action: PayloadAction<string>): IAuthState => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: false,
        error: action.payload
      }
    }),
    signUpStart: (state): IAuthState => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: true
      }
    }),
    signUpSuccess: (state, action: PayloadAction<string>): IAuthState => ({
      ...state,
      authData: {
        ...state.authData,
        accessToken: action.payload,
        isLoading: false,
        error: null
      }
    }),
    signUpFailure: (state, action: PayloadAction<string>): IAuthState => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: false,
        error: action.payload
      }
    }),
    loadProfileStart: (state): IAuthState => ({
      ...state,
      profileData: {
        ...state.profileData,
        isLoading: true
      }
    }),
    loadProfileSuccess: (
      state,
      action: PayloadAction<IProfile>
    ): IAuthState => ({
      ...state,
      profileData: {
        ...state.profileData,
        profile: action.payload,
        isLoading: false,
        error: null
      }
    }),
    loadProfileFailure: (state, action: PayloadAction<string>): IAuthState => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: false,
        error: action.payload
      }
    }),
    logoutStart: (state): IAuthState => ({
      ...state,
      profileData: {
        ...state.profileData,
        isLoading: true
      }
    }),
    logoutSuccess: (): IAuthState => initialState,
    logoutFailure: (state, action: PayloadAction<string>): IAuthState => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: false,
        error: action.payload
      }
    })
  }
})

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  loadProfileStart,
  loadProfileSuccess,
  loadProfileFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure
} = authSlice.actions

export default authSlice.reducer
