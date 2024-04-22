import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex gap-8 bg-primary text-base-100 p-4 rounded-xl">
        <h3 className="font-extrabold text-9xl">404</h3>
        <div className="flex flex-col justify-between gap-4">
          <div className='h-full flex items-center'>
            <h4 className="font-semibold text-3xl">Страница не найдена</h4>
          </div>
          <Link to="/" className="btn btn-secondary text-base-100">
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
