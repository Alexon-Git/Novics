import { useEffect, useRef } from 'react'
import PollUpdate from '../../../ui/Admin/PollUpdate'
import autoAnimate from '@formkit/auto-animate'
import { useQuery } from '@tanstack/react-query'
import { PollsService } from '../../../../services/polls/polls.service'
import AdminRequestSkelet from '../../../ui/Admin/AdminRequestSkelet'

const UpdatePolls = () => {
  const query = useQuery({
    queryKey: ['polls'],
    queryFn: () => PollsService.getPolls()
  })
  const parent = useRef(null)
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])
  return (
    <section className="my-20">
      <div className="hero mx-auto container">
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-[36px] font-bold">
            Изменение ссылок на опросники
            {query.isLoading && (
              <span className="loading loading-spinner text-primary"></span>
            )}
          </h2>
          <div
            ref={parent}
            className="relative flex flex-col justify-between items-center gap-6"
          >
            {query.isSuccess &&
              query.data?.data.map((poll) => (
                <PollUpdate key={poll.id} props={poll} />
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

export default UpdatePolls
