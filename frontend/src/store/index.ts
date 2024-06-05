import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import logger from 'redux-logger'
import modalReducer from './modals/modalReducer'
import { userSlice } from './user/userReducer'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import DocsReducer from './Docs/DocsReducer'

const persistConfig = {
  key: 'root',
  version: 1,
  whitelist: ['modal', 'docs'],
  storage,
}

const RootReducer = combineReducers({
  user: userSlice.reducer,
  modal: modalReducer,
  docs: DocsReducer
})

const persistedReducer = persistReducer(persistConfig, RootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(
      ...(process.env.NODE_ENV === 'production' ? [logger] : [])
    )
})

export const persistor = persistStore(store)
export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
