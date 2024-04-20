import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IAuthState } from './authReducer.interface'
import { RootStore } from '..'

const initialState: IAuthState = {
  user: null,
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCred: (state, action: PayloadAction<IAuthState>) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
    },
    logOut: () => initialState
  }
})

export const { setCred, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootStore) => state.auth.user
export const selectCurrentToken = (state: RootStore) => state.auth.token
