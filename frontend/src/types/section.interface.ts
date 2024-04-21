import { INew } from "../services/news/news.interface"

export interface INewsCard extends INew {
  id: string | number
}

export interface IPollsCard {
  id: string | number
  title: string
  url: string
}

export interface IDocsCard {
  id: string | number
  title: string
  size: string | number
  date: string
  url: string
}
