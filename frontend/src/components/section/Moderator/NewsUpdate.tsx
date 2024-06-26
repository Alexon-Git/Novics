import { useQuery } from '@tanstack/react-query'
import { NewsService } from '../../../services/news/news.service'
import UpdateNew from '../../ui/form/UpdateNew'

const NewsUpdate = () => {
  const query = useQuery({ queryKey: ['news'], queryFn: NewsService.getNews })
  return (
    <section className="my-20">
      <div className="hero mx-auto container">
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-[36px] font-bold">Редактирование новостей</h2>
          <div className="grid grid-cols-4">
            {query.isSuccess &&
              query.data.data.map((item) => <UpdateNew key={item.id} props={item} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsUpdate
