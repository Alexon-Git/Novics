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
      firstName: props.firstName,
      lastName: props.lastName,
      surName: props.surName,
      email: props.email,
      city: props.city,
      country: props.country,
      timeZone: props.timeZone
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
              {...register('firstName')}
              type="text"
              className="input input-bordered rounded-none input-ghost h-8 min-h-8"
              placeholder={props.firstName}
            />
          </label>
          <label className="flex items-center justify-between font-extralight">
            Фамилия
            <input
              {...register('lastName')}
              type="text"
              className="input input-bordered rounded-none input-ghost h-8 min-h-8"
              placeholder={props.lastName}
            />
          </label>
          <label className="flex items-center justify-between font-extralight">
            Отчество
            <input
              {...register('surName')}
              type="text"
              className="input input-bordered rounded-none input-ghost h-8 min-h-8"
              placeholder={props.surName}
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
              {...register('city')}
              type="text"
              className="input input-bordered rounded-none input-ghost h-8 min-h-8"
              placeholder={props.city ? props.city : 'Ваш город'}
            />
          </label>
          <label className="flex items-center justify-between font-extralight">
            Страна
            <input
              {...register('country')}
              type="text"
              className="input input-bordered rounded-none input-ghost h-8 min-h-8"
              placeholder={props.country ? props.country : 'Страна'}
            />
          </label>
          <label className="flex items-center justify-between font-extralight">
            Часовой пояс
            <input
              {...register('timeZone')}
              type="text"
              className="input input-bordered rounded-none input-ghost h-8 min-h-8"
              placeholder={props.timeZone ? props.timeZone : 'Часовой пояс'}
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
        }}
        className="absolute right-0 bottom-0 btn btn-primary rounded-[4px] h-11 min-h-11 text-base-100 text-xl font-semibold"
      >
        Выйти
      </button>
    </div>
  )
}

export default SettingForm
