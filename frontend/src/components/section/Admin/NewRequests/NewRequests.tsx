import { useQuery } from '@tanstack/react-query'
// import { IUser } from '../../../../services/users/users.interface'
import AdminRequest from '../../../ui/Admin/AdminRequest'
import { useEffect, useRef } from 'react'
import autoAnimate from '@formkit/auto-animate'
import AdminRequestSkelet from '../../../ui/Admin/AdminRequestSkelet'
import { UserService } from '../../../../services/users/users.service'

const NewRequests = () => {
  const parent = useRef(null)
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])
  const query = useQuery({ queryKey: ['users'], queryFn: UserService.getUsers })
  return (
    <section className="my-20">
      <div className="hero mx-auto container">
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-[36px] font-bold">
            Новые заявки{' '}
            {query.isLoading && (
              <span className="loading loading-spinner text-primary"></span>
            )}
          </h2>
          <div
            ref={parent}
            className="flex flex-col justify-between items-center gap-6"
          >
            {query.isSuccess &&
              query.data?.data.map((request) => (
                <AdminRequest key={request.id} props={request} />
              ))}
            {query.isLoading && (
              <>
                <AdminRequestSkelet />
                <AdminRequestSkelet />
                <AdminRequestSkelet />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewRequests
