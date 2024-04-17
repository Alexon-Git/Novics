export interface INewsCard {
  id: string | number
  img: string
  text: string
  link: {
    url: string
    title: string
  }
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
