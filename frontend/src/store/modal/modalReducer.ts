import { createSlice } from '@reduxjs/toolkit'
import { IModalState } from './modal.interface'

const initialState: IModalState = {
  isSignUpModalOpen: false,
  isSignInModalOpen: false
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openRegisterModal: (state) => {
      state.isSignUpModalOpen = true
      state.isSignInModalOpen = false
    },
    closeRegisterModal: (state) => {
      state.isSignUpModalOpen = false
      state.isSignInModalOpen = false
    },
    openLoginModal: (state) => {
      state.isSignInModalOpen = true
      state.isSignUpModalOpen = false
    },
    closeLoginModal: (state) => {
      state.isSignInModalOpen = false
      state.isSignUpModalOpen = false
    }
  }
})

export const {
  openRegisterModal,
  closeRegisterModal,
  openLoginModal,
  closeLoginModal
} = modalSlice.actions

export default modalSlice.reducer
