import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import logger from 'redux-logger'
import modalReducer from './modals/modalReducer'
import { userSlice } from './user/userReducer'

const RootReducer = combineReducers({
  user: userSlice.reducer,
  modal: modalReducer
})

export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ...(process.env.NODE_ENV === 'production' ? [logger] : [])
    )
})

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
