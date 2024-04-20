import { Link } from 'react-router-dom'
import { INewsCard } from '../../../../types/section.interface'

const HomeNewsCard = ({ props }: { props: INewsCard }) => {
  return (
    <div className="flex flex-col gap-4">
      <img src={props.img} alt="newsImage" className="rounded-[20px]" />
      <h3 className=' font-bold text-xl'>{props.title}</h3>
      <p>{props.text}</p>
      <Link to={props.url} className="font-semibold">
        {props.url}
      </Link>
    </div>
  )
}

export default HomeNewsCard
