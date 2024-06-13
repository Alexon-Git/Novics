import { useForm } from 'react-hook-form'
import { IUser } from '../../../services/users/users.interface'
import { useActions } from '../../../hooks/useActions'

const SettingForm = ({ props }: { props: IUser }) => {
  const {
    handleSubmit,
    register,
    // formState: { errors }
  } = useForm<Partial<IUser>>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      first_name: props.first_name,
      last_name: props.last_name,
      patronymic: props.patronymic,
      email: props.email,
      town: props.town,
      UTC: props.UTC
    }
  })

  const { updateCurrentUser, logout } = useActions()

  const onSubmit = async (data: Partial<IUser>) => {
    updateCurrentUser(data)
  }
  return (
    <div className=' relative'>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-16">
        <div className="w-1/4 flex flex-col justify-between gap-6">
          <label className="flex items-center justify-between font-extralight">
            Имя
            <input
              {...register('first_name')}
              type="text"
              className="input input-bordered rounded-none input-ghost h-8 min-h-8"
              placeholder={props.first_name}
            />
          </label>
          <label className="flex items-center justify-between font-extralight">
            Фамилия
            <input
              {...register('last_name')}
              type="text"
              className="input input-bordered rounded-none input-ghost h-8 min-h-8"
              placeholder={props.last_name}
            />
          </label>
          <label className="flex items-center justify-between font-extralight">
            Отчество
            <input
              {...register('patronymic')}
              type="text"
              className="input input-bordered rounded-none input-ghost h-8 min-h-8"
              placeholder={props.patronymic}
            />
          </label>
          <label className="flex items-center justify-between font-extralight">
            Почта
            <input
              {...register('email')}
              type="email"
              className="input input-bordered rounded-none input-ghost h-8 min-h-8"
              placeholder={props.email}
            />
          </label>
          <label className="flex items-center justify-between font-extralight">
            Город
            <input
              {...register('town')}
              type="text"
              className="input input-bordered rounded-none input-ghost h-8 min-h-8"
              placeholder={props.town ? props.town : 'Ваш город'}
            />
          </label>
          <label className="flex items-center justify-between font-extralight">
            Часовой пояс
            <input
              {...register('UTC')}
              type="text"
              className="input input-bordered rounded-none input-ghost h-8 min-h-8"
              placeholder={props.UTC ? props.UTC : 'Часовой пояс'}
            />
          </label>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              className="btn btn-primary rounded-[4px] h-11 min-h-11 text-base-100 text-xl font-semibold"
              type="submit"
            >
              Обновить профиль
            </button>
            <button
              className="btn btn-primary rounded-[4px] h-11 min-h-11 text-base-100 text-xl font-semibold"
              type="reset"
            >
              Отмена
            </button>
          </div>
        </div>
      </form>
      <button
        onClick={() => {
          logout()
          location.reload()
        }}
        className="absolute right-0 bottom-0 btn btn-primary rounded-[4px] h-11 min-h-11 text-base-100 text-xl font-semibold"
      >
        Выйти
      </button>
    </div>
  )
}

export default SettingForm
