import { useState } from 'react'
import { ISignUpRequest } from '../../../services/auth/auth.interface'
import { useForm } from 'react-hook-form'
import { useSignUpMutation } from '../../../services/auth/auth.service'
import { hasError } from '../../../utils/hasError'
import { emailPattern } from './emailPattern'

const SignUpForm = () => {
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>()
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<ISignUpRequest>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      surName: '',
      email: '',
      password: ''
    }
  })

  const [signUp, { isLoading, isError }] = useSignUpMutation()
  const [error, setError] = useState<string>()

  const onSubmit = async (data: ISignUpRequest) => {
    try {
      await signUp(data).unwrap()
    } catch (err) {
      if (hasError(err)) {
        setError(err.data.error)
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col z-20"
    >
      <div className="flex flex-col gap-3 py-12">
        <div className="flex flex-col gap-8 text-[#A9A9A9]">
          <div>
            <input
              {...register('firstName', {
                required: true
              })}
              type="text"
              placeholder="Имя"
              className={`input ${errors.firstName && 'input-error'} bg-base-100 w-full rounded-[10px]`}
            />
            {errors.firstName?.type === 'required' && (
              <p className="font-medium text-sm text-error">
                * это поле обязательно
              </p>
            )}
          </div>
          <div>
            <input
              {...register('lastName', {
                required: true
              })}
              type="text"
              placeholder="Фамилия"
              className={`input ${errors.lastName && 'input-error'} bg-base-100 w-full rounded-[10px]`}
            />
            {errors.lastName?.type === 'required' && (
              <p className="font-medium text-sm text-error">
                * это поле обязательно
              </p>
            )}
          </div>
          <div>
            <input
              {...register('surName', {
                required: true
              })}
              type="text"
              placeholder="Отчество"
              className={`input ${errors.surName && 'input-error'} bg-base-100 w-full rounded-[10px]`}
            />
            {errors.surName?.type === 'required' && (
              <p className="font-medium text-sm text-error">
                * это поле обязательно
              </p>
            )}
          </div>
          <div>
            <input
              {...register('email', {
                required: true,
                pattern: emailPattern
              })}
              type="email"
              placeholder="Почта"
              className={`input ${errors.email && 'input-error'} bg-base-100 w-full rounded-[10px]`}
            />
            {errors.email?.type === 'required' && (
              <p className="font-medium text-sm text-error">
                * это поле обязательно
              </p>
            )}
            {errors.email?.type === 'pattern' && (
              <p className="font-medium text-sm text-error">
                * это поле должно соответстовать почте
              </p>
            )}
          </div>
          <div>
            <input
              {...register('password', {
                required: true,
                validate: (value) =>
                  value === passwordConfirmation || 'Пароли не совпадают'
              })}
              type="password"
              placeholder="Пароль"
              className={`input ${errors.password && 'input-error'} bg-base-100 w-full rounded-[10px]`}
            />
            {errors.password?.type === 'required' && (
              <p className="font-medium text-sm text-error">
                * это поле обязательно
              </p>
            )}
          </div>
          <div>
            <input
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              type="password"
              placeholder="Подтвердите пароль"
              className={`input ${errors.password && 'input-error'} bg-base-100 w-full rounded-[10px]`}
            />
            {errors.password?.type === 'required' && (
              <p className="font-medium text-sm text-error">
                * это поле обязательно
              </p>
            )}
          </div>
        </div>
        {errors.password?.type === 'validate' && (
          <p className="font-medium text-sm text-error">*Пароли не совпадают</p>
        )}
        {error && isError && (
          <p className="font-medium text-sm text-error">*{error}</p>
        )}
      </div>
      <button className="w-full btn btn-secondary text-base-100 rounded-[12px] font-medium text-xl">
        {!isLoading ? (
          'Зарегистрироваться'
        ) : (
          <div role="status">
            <span className="loading loading-spinner text-base-100"></span>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </button>
    </form>
  )
}

export default SignUpForm
