import { IPollsCard } from '../../../../types/section.interface'
import PollUpdate from '../../../ui/Admin/PollUpdate'

const UpdatePolls = () => {
  const polls: IPollsCard[] = [
    {
      id: 0,
      title: 'poll',
      url: 'url'
    },
    {
      id: 1,
      title: 'poll2',
      url: 'url'
    }
  ]
  return (
    <section className="my-20">
      <div className="hero mx-auto container">
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-[36px] font-bold">
            Изменение ссылок на опросники
          </h2>
          <div className="relative flex flex-col justify-between items-center gap-6">
            {polls.map((poll) => (
              <PollUpdate key={poll.id} props={poll} />
            ))}
            <div className="w-full flex justify-end">
              <button className="btn btn-primary rounded-[10px] min-h-11 h-11 px-6">
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UpdatePolls
