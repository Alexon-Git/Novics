import { createSlice } from '@reduxjs/toolkit'
import { IModalState } from './modal.interface'

const initialState: IModalState = {
  isOpen: false,
  isSignUpModalOpen: false,
  isSignInModalOpen: false
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openSignUpModal: (state) => {
      if (!state.isOpen) state.isOpen = true
      state.isSignUpModalOpen = true
      state.isSignInModalOpen = false
    },
    openSignInModal: (state) => {
      if (!state.isOpen) state.isOpen = true
      state.isSignInModalOpen = true
      state.isSignUpModalOpen = false
    },
    closeModal: (state) => {
      state.isOpen = false
    }
  }
})

export const { openSignUpModal, openSignInModal, closeModal } =
  modalSlice.actions

export default modalSlice.reducer
