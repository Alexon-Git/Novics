import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ISignInRequest } from '../../../services/auth/auth.interface'
import { useSignInMutation } from '../../../services/auth/auth.service'
import { emailPattern } from './emailPattern'
import { hasError } from '../../../utils/hasError'

const SignInForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<ISignInRequest>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const [signIn, { isLoading, isError }] = useSignInMutation()
  const [error, setError] = useState<string>()

  const onSubmit = async (data: ISignInRequest) => {
    try {
      await signIn(data).unwrap()
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
                required: true
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
        </div>
        {error && isError && (
          <p className="font-medium text-sm text-error">*{error}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full btn btn-secondary text-base-100 rounded-[12px] font-medium text-xl"
      >
        {!isLoading ? (
          'Войти'
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

export default SignInForm
