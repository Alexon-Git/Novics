import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  error: ''
}

const errorReducer = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, { payload }) => {
      state.error = payload
    }
  }
})

export const { setError } = errorReducer.actions

export default errorReducer.reducer
