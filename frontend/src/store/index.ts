import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import logger from 'redux-logger'
import modalReducer from './modals/modalReducer'
import authReducer from './auth/authReducer'
import { api } from '../services/api'
import { listenerMiddleware } from '../middleware/auth'

const RootReducer = combineReducers({
  auth: authReducer,
  [api.reducerPath]: api.reducer,
  modal: modalReducer
})

export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        ...(process.env.NODE_ENV === 'production' ? [logger] : []),
        api.middleware
      )
      .prepend(listenerMiddleware.middleware)
})

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
