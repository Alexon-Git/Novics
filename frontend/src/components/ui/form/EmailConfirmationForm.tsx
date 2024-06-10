import { useForm } from 'react-hook-form'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useActions } from '../../../hooks/useActions'
import { useEffect } from 'react'

const EmailConfirmationForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<{ otp_code: string }>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      otp_code: ''
    }
  })

  const { isLoading, error, user } = useTypedSelector((state) => state.user)
  const { verifyOtp, sendOtp } = useActions()

  const onSubmit = async (data: { otp_code: string }) => {
    // if (user && user.id) {
      verifyOtp(data)
    // }
    // if (user?.is_active) {
    //   getCurrentUser()
    // }
  }

  useEffect(() => {
    if (user && user.id && !user.is_active) {
      sendOtp()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col z-20"
    >
      <div className="flex flex-col gap-3 py-12 text-[#A9A9A9]">
        <input
          {...register('otp_code', {
            required: true
          })}
          type="text"
          placeholder="--- ---"
          className={`input ${errors.otp_code && 'input-error'} bg-base-100 w-full rounded-[10px]`}
        />
        {errors.otp_code?.type === 'required' && (
          <p className="font-medium text-sm text-error">
            * это поле обязательно
          </p>
        )}
      </div>
      {error && (
        <p className="font-medium text-sm text-error">
          *Введен неправильный код
        </p>
      )}
      <button
        disabled={isLoading}
        className="w-full btn btn-secondary text-base-100 rounded-[12px] font-medium text-xl"
      >
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

export default EmailConfirmationForm
