import { useQuery } from '@tanstack/react-query'
import { TablesService } from '../../../services/tables/tables.service'
import ModeratorRequest from '../../ui/Moderator/ModeratorRequest'
import autoAnimate from '@formkit/auto-animate'
import { useEffect, useRef } from 'react'

const NewRequests = () => {
  const query = useQuery({
    queryKey: ['notes'],
    queryFn: () => TablesService.getTablesWithFilter('new')
  })
  const parent = useRef(null)
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])
  return (
    <section className="my-20">
      <div className="hero mx-auto container">
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-[36px] font-bold">Новые заявки</h2>
          <div ref={parent} className="flex flex-col justify-between items-center gap-6">
            {query.isSuccess &&
              query.data.data.map((request) => (
                <ModeratorRequest key={request.id} props={request} />
              ))}
            {query.isPending && (
              <div role="status">
                <span className="loading loading-spinner text-base-100"></span>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewRequests
