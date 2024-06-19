import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICountry } from '../../services/country/country.interface'
import { IUniversity } from '../../services/university/university.interface'
import { Bounce, toast } from 'react-toastify'

export interface IFile {
  file: File | null | undefined
  country: ICountry | undefined
  university: IUniversity | undefined
  education: string
  count: number | string
  form: string
  level: string
}

interface IDocs {
  docs: IFile[] | null
}

const initialState: IDocs = {
  docs: []
}

const DocsSlice = createSlice({
  name: 'docs',
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<IFile>) => {
      if (
        !action.payload.count ||
        !action.payload.country ||
        !action.payload.education ||
        !action.payload.file ||
        !action.payload.form ||
        !action.payload.level ||
        !action.payload.university
      ) {
        toast.error('Все поля обязательны для заполнения!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce
        })
      } else {
        state.docs?.push(action.payload)
      }
    },
    removeFile: (state, { payload }: PayloadAction<number>) => {
      if (state.docs && payload >= 0 && payload < state.docs.length) {
        state.docs.splice(payload, 1)
      }
    }
  }
})

export const { addFile, removeFile } = DocsSlice.actions

export default DocsSlice.reducer
