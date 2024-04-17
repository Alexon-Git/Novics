import { Link } from 'react-router-dom'
import { INewsCard } from '../../../../types/section.interface'

const HomeNewsCard = ({ props }: { props: INewsCard }) => {
  return (
    <Link to={`/news/${props.id}`} className="flex flex-col gap-4">
      <img src={props.img} alt="newsImage" className="rounded-[20px]" />
      <p>{props.text}</p>
      <a href={props.link.url} className="font-semibold">
        {props.link.title}
      </a>
    </Link>
  )
}

export default HomeNewsCard
