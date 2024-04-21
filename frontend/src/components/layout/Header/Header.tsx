import { useLocation } from 'react-router-dom'
import { ILinks } from '../../../types/layout.interface'

export const Links: ILinks[] = [
  {
    id: 0,
    url: '/',
    title: 'Главная страница'
  },
  {
    id: 1,
    anchor: '#news',
    title: 'Новости'
  },
  {
    id: 2,
    anchor: '#polls',
    title: 'Опросы'
  },
  {
    id: 3,
    anchor: '#docs',
    title: 'Документы'
  }
]

const Header = ({ children }: { children: React.ReactElement[] }) => {
  const {pathname} = useLocation();
  return (
    <div className={`absolute top-0 ${pathname !== '/' && 'bg-primary'} w-full flex justify-center`}>
      <header className="navbar container sm:px-0 py-6 z-20">{children}</header>
    </div>
  )
}

export default Header
