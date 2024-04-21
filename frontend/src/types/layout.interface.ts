export interface ILinks {
  id: string | number;
  url?: string
  title: string
  anchor?: string
  children?: Array<ILinks>
}
