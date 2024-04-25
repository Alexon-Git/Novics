import { Middleware, MiddlewareAPI, isRejectedWithValue } from "@reduxjs/toolkit";
import { setError } from "../Error/errorReducer";

export const rtkQueryError: Middleware = (api: MiddlewareAPI) => next => action => {
  if (isRejectedWithValue(action)) {
    setError(action.error.message)
  }
  return next(action)
}