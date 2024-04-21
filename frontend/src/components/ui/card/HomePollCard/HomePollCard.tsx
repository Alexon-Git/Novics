import { Link } from 'react-router-dom'
import { IPollsCard } from '../../../../types/section.interface'

const HomePollCard = ({ props }: { props: IPollsCard }) => {
  return (
    <div className="card bg-neutral min-h-52 shadow rounded-[20px]">
      <div className="card-body p-4 justify-between">
        <h3 className="card-title">{props.title}</h3>
        <div className="card-actions">
          <Link to={props.url} className="btn btn-primary text-base-100 font-semibold rounded-[10px] w-full">
            Перейти к опросу
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePollCard
