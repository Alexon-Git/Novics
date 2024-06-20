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