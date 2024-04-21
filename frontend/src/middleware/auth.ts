import { createListenerMiddleware } from "@reduxjs/toolkit"
import { authApi } from "../services/auth/auth.service"

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  matcher: authApi.endpoints.signIn.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners()
    if (action.payload.token) {
      localStorage.setItem("token", action.payload.token)
    }
  },
})

listenerMiddleware.startListening({
  matcher: authApi.endpoints.signUp.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners()
    if (action.payload.token) {
      localStorage.setItem("token", action.payload.token)
    }
  },
})