import autoAnimate from '@formkit/auto-animate'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import EmailConfirmationForm from '../../ui/form/EmailConfirmationForm'

const EmailConfirmationModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const parent = useRef(null)
  const { user } = useTypedSelector((state) => state.user)

  useEffect(() => {
    if (user && !user.is_active) {
      setIsOpen(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
        onClose={() => setIsOpen(false)}
      >
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

        <div className="fixed inset-0 overflow-hidden">
          <div
            ref={parent}
            className="flex min-h-full items-center justify-center"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="modal-box w-auto rounded-2xl text-base-100 overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-full bg-[#797979] z-10 mix-blend-multiply" />
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
                <div className="relative flex flex-col justify-between gap-10 z-20">
                  <h3 className="text-2xl font-bold uppercase text-center">
                    ВВЕДИТЕ КОД ПОДТВЕРЖДЕНИЯ ИЗ ПОЧТЫ
                  </h3>
                  <EmailConfirmationForm />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default EmailConfirmationModal
