// import { IPollsCard } from '../../../types/section.interface'
import { useQuery } from '@tanstack/react-query'
import HomePollCard from '../../ui/card/HomePollCard/HomePollCard'
import { PollsService } from '../../../services/polls/polls.service'

const HomePolls = () => {
  // const polls: IPollsCard[] = [
  //   {
  //     id: 0,
  //     title: 'Студенческая жизнь: проблемы и достижения',
  //     url: 'https://vk.com'
  //   },
  //   {
  //     id: 1,
  //     title: 'Учёба или работа: что важнее?',
  //     url: 'https://vk.com'
  //   },
  //   {
  //     id: 2,
  //     title:
  //       'Студенческие гаджеты: какими устройствами пользуются учащиеся вузов',
  //     url: 'https://vk.com'
  //   },
  //   {
  //     id: 3,
  //     title: 'Портрет современного студента: каким он видит своё будущее',
  //     url: 'https://vk.com'
  //   }
  // ]
  const query = useQuery({ queryKey: ['polls'], queryFn: PollsService.getPolls })
  return (
    <section id="polls" className="my-20">
      <div className="hero mx-auto container">
        <div className="flex flex-col gap-4">
          <h2 className="text-[36px] font-bold">Опросы</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-between items-center gap-8">
            {query.data?.data.map((poll) => (
              <HomePollCard key={poll.id} props={poll} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePolls
