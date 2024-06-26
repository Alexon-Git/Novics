import { Link } from 'react-router-dom'
import { INewsCard } from '../../../types/section.interface'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import UpdateNewModal from '../../modals/UpdateNewModal/UpdateNewModal'

const UpdateNew = ({ props }: { props: INewsCard }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <>
      <UpdateNewModal isOpen={isOpen} setIsOpen={setIsOpen} news={props} />
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex flex-col gap-4 p-4 relative"
      >
        {isHovered && (
          <div className="absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-300">
            <button onClick={() => setIsOpen(!isOpen)} className="text-base-100 focus:outline-none">
              <PencilSquareIcon className="h-16 w-16" />
            </button>
          </div>
        )}
        <div
          className={`relative rounded-[20px] h-[185px] overflow-hidden ${isHovered ? 'opacity-50' : ''}`}
        >
          <img
            src={`https://novis.ddns.net${props.image}`}
            alt="newsImage"
            className="object-cover"
          />
        </div>
        <div className="flex gap-2 text-base">
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
        <Link to={props.url} className="font-semibold">
          {props.url}
        </Link>
        <div
          className={`rounded-xl absolute inset-0 z-10 bg-[black] opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-50' : ''}`}
        />
      </div>
    </>
  )
}

export default UpdateNew
