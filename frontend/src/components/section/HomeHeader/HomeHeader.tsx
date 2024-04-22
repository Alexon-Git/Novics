import { useDispatch, useSelector } from 'react-redux'
import {
  openSignInModal,
  openSignUpModal
} from '../../../store/modals/modalReducer'
import { RootStore } from '../../../store'
import { Link } from 'react-router-dom'

const HomeHeader = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootStore) => state.user.user)
  return (
    <section className="bg-bg-gradient pt-32 pb-8 w-full min-h-[800px] bg-cover bg-no-repeat flex items-center lg:pt-0 lg:pb-0">
      <div className="hero mx-auto container">
        <div className="flex justify-between items-center flex-col gap-8 lg:gap-24 lg:flex-row-reverse">
          <img
            src="/mocks/tablet.png"
            className="w-full max-w-xl drop-shadow-2xl"
          />
          <div className="text-base-100">
            <h1 className="text-3xl font-bold">
              Информационная система управления аналитикой данных по иностранным
              обучающимся ВУЗов Новосибирской области
            </h1>
            <p className="opacity-70 py-6">
              Предоставление отчетов и графиков, отображающих результаты анализа
              данных, автоматизация процессов, связанных с обработкой данных
              иностранных студентов.
            </p>
            {currentUser && currentUser?.isCheckedByAdmin ? (
              <Link
                className="btn btn-secondary hover:bg-[#FF8648] border-none text-base-100 font-medium px-8"
                to={`/dashboard/${currentUser.role}`}
              >
                Перейти в панель управления
              </Link>
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={() => dispatch(openSignInModal())}
                  className="btn btn-secondary hover:bg-[#FF8648] border-none text-base-100 px-6"
                >
                  Войти
                </button>
                <button
                  onClick={() => dispatch(openSignUpModal())}
                  className="btn btn-outline hover:bg-transparent hover:text-secondary hover:border-secondary btn-ghost text-base-100 px-6"
                >
                  Зарегистрироваться
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHeader
