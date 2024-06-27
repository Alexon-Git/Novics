export interface ITable {
  id: string | number
  university: string
  country: string
  education_type: string
  education_form: string
  education_level: string
  students_amount: string | number
}

export interface ITableResponse {
  id: string | number
  title: string
  date: string
  file: string
  creator: string
  approved: boolean | null
  notes: ITable[]
}

export interface IModeratorTable extends ITableResponse {
  creator: string
}

export interface INoteRequest {
  tableId: string | number
  noteId: string | number
  university: string
  country: string
  education_type: string
  education_form: string
  education_level: string
  students_amount: string | number
}

export interface IGenTable {
  sheet_1: string[]
  sheet_2: string[]
  sheet_3: string[]
  file: string
}