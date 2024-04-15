export interface ILinks {
  id: string | number;
  url: string
  title: string
  children?: Array<ILinks>
}
