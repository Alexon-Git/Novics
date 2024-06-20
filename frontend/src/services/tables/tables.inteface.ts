export interface ITable {
  id: string | number
  country: string
  education_type: string
  education_form: string
  education_level: string
  students_amount: string | number
}

export interface ITableResponse {
  table_id: string | number
  table: ITable[]
}