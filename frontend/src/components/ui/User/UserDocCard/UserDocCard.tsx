import { Link } from 'react-router-dom'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { ITableResponse } from '../../../../services/tables/tables.inteface'

const UserDocCard = ({ props }: { props: ITableResponse }) => {
  return (
    <div className="w-full bg-base-100 p-4 rounded-[9px] flex justify-between items-center">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <DocumentTextIcon className='h-6 w-6' />
        <h3 className="font-medium">{props.title} {props.date}</h3>
      </div>
      <Link className='flex gap-2 items-center bg-primary text-base-100 font-medium rounded-md px-2 py-1' to={`https://novis.ddns.net${props.file}`} download>
        Скачать
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 16.6666L7 11.4583L8.4 9.94788L11 12.6562V4.16663H13V12.6562L15.6 9.94788L17 11.4583L12 16.6666ZM6 20.8333C5.45 20.8333 4.97933 20.6295 4.588 20.2218C4.19667 19.8142 4.00067 19.3236 4 18.75V15.625H6V18.75H18V15.625H20V18.75C20 19.3229 19.8043 19.8135 19.413 20.2218C19.0217 20.6302 18.5507 20.834 18 20.8333H6Z"
            fill="white"
          />
        </svg>
      </Link>
    </div>
  )
}

export default UserDocCard
