import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../../../store'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react/jsx-runtime'
import {
  closeModal,
  openSignInModal,
  openSignUpModal
} from '../../../store/modals/modalReducer'
import SignInForm from '../../ui/form/SignInForm'
import SignUpForm from '../../ui/form/SignUpForm'
import { useEffect, useRef } from 'react'
import autoAnimate from '@formkit/auto-animate'

const SignModal = () => {
  const dispatch = useDispatch()
  const isSignUpModalOpen = useSelector(
    (state: RootStore) => state.modal.isSignUpModalOpen
  )
  const isOpen = useSelector((state: RootStore) => state.modal.isOpen)
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={() => dispatch(closeModal())}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-base-100/40" />
        </Transition.Child>
        <div
          ref={parent}
          className="fixed inset-0 flex items-center justify-center overflow-auto"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className={`relative flex flex-col p-10 w-full ${isSignUpModalOpen ? 'min-h-[700px]' : 'min-h-[350px]'} max-h-full h-full overflow-hidden md:modal-box md:w-auto md:h-auto md:rounded-2xl text-base-100 `}>
              <div className="absolute bottom-0 left-0 h-full w-full bg-[#797979] z-10 mix-blend-multiply" />
              <img
                className="absolute top-0 right-0"
                src="/mocks/signTop.svg"
                alt="topMock"
              />
              <img
                className="absolute bottom-0 left-0"
                src="/mocks/signBottom.svg"
                alt="bottomMock"
              />
              <div className="relative flex flex-col md:flex-row justify-between gap-10 z-20">
                <button
                  className="text-2xl font-bold uppercase z-10"
                  onClick={() => dispatch(openSignInModal())}
                >
                  Войти
                </button>
                <span
                  className={`hidden md:block text-2xl font-bold absolute uppercase left-0 ${!isSignUpModalOpen ? '' : 'translate-x-32'} -bottom-1 text-transparent h-1 bg-secondary rounded-full duration-200`}
                >
                  {!isSignUpModalOpen ? 'Войти' : 'Зарегистрироваться'}
                </span>
                <button
                  className="text-2xl font-bold uppercase z-10"
                  onClick={() => dispatch(openSignUpModal())}
                >
                  Зарегистрироваться
                </button>
              </div>
              <button
                onClick={() => dispatch(closeModal())}
                className="z-30 absolute top-5 right-5 block md:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isSignUpModalOpen ? (
                <>
                  <SignUpForm />
                </>
              ) : (
                <>
                  <SignInForm />
                </>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default SignModal
