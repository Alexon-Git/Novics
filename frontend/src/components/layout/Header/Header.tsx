import { ILinks } from '../../../types/layout.interface'

export const Links: ILinks[] = [
  {
    id: 0,
    url: '/',
    title: 'Главная страница'
  },
  {
    id: 1,
    url: '/news',
    title: 'Новости'
  },
  {
    id: 2,
    url: '/polls',
    title: 'Опросы'
  },
  {
    id: 3,
    url: '/documents',
    title: 'Документы'
  }
]

const Header = ({ children }: { children: React.ReactElement[] }) => {
  return (
    <header className="absolute top-0 w-full">
      <div className="relative mx-auto container navbar py-6 z-30">{children}</div>
    </header>
  )
}

export default Header
