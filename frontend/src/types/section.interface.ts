import { IDoc } from "../services/docs/docs.interface"
import { INew } from "../services/news/news.interface"

export interface INewsCard extends INew {
  id: string | number
}

export interface IPollsCard {
  id: string | number
  title: string
  url: string
}

export interface IDocsCard extends IDoc {
  id: string | number
}

export interface ISort {
  value: string
  title: string
}