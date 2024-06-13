import { Link } from 'react-router-dom'
import { INewsCard } from '../../../../types/section.interface'

const HomeNewsCard = ({ props }: { props: INewsCard }) => {
  return (
    <Link to={props.url} className="flex flex-col gap-4">
      <img src={`https://novis.ddns.net/${props.image}`} alt="newsImage" className="rounded-[20px] h-[185px] object-cover" />
      <div className='flex items-center gap-2 text-base'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
          />
        </svg>
        {props.date}
      </div>
      <h3 className=" font-bold text-xl">{props.title}</h3>
      <p>{props.text}</p>
      {/* <Link to={props.url} className="font-semibold">
        {props.url}
      </Link> */}
    </Link>
  )
}

export default HomeNewsCard
