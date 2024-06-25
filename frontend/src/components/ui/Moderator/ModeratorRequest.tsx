import { Link } from 'react-router-dom'
import { IModeratorTable } from '../../../services/tables/tables.inteface'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast, Bounce } from 'react-toastify'
import { TablesService } from '../../../services/tables/tables.service'

const ModeratorRequest = ({ props }: { props: IModeratorTable }) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: TablesService.patchTable,
    onError: () => {
      toast.error('Ошибка изменения записи!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce
      })
    },
    onSuccess: () => {
      toast.success('Запись успешно изменена!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce
      })
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      queryClient.invalidateQueries({ queryKey: ['genTable'] })
      queryClient.invalidateQueries({ queryKey: ['myNotesApproved'] })
      queryClient.invalidateQueries({ queryKey: ['myNotesUnapproved'] })
    }
  })
  return (
    <div className="w-full flex-col gap-4 px-4 py-4 bg-neutral rounded-[9px]">
      <div className="flex justify-between">
        <div className="flex items-center gap-4 font-light">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.903 8.586C19.8556 8.47747 19.7892 8.37825 19.707 8.293L13.707 2.293C13.6217 2.21078 13.5225 2.14441 13.414 2.097C13.384 2.083 13.352 2.075 13.32 2.064C13.2363 2.03553 13.1492 2.01837 13.061 2.013C13.04 2.011 13.021 2 13 2H6C4.897 2 4 2.897 4 4V20C4 21.103 4.897 22 6 22H18C19.103 22 20 21.103 20 20V9C20 8.979 19.989 8.96 19.987 8.938C19.9821 8.84972 19.9649 8.76255 19.936 8.679C19.926 8.647 19.917 8.616 19.903 8.586ZM16.586 8H14V5.414L16.586 8ZM6 20V4H12V9C12 9.26522 12.1054 9.51957 12.2929 9.70711C12.4804 9.89464 12.7348 10 13 10H18L18.002 20H6Z"
              fill="black"
            />
            <path
              d="M8 12H16V14H8V12ZM8 16H16V18H8V16ZM8 8H10V10H8V8Z"
              fill="black"
            />
          </svg>
          <h3>{`${props.title} ${props.date}`}</h3>
          <h4>{props.creator}</h4>
        </div>
        <Link
          to={`https://novis.ddns.net${props.file}`}
          className=" btn btn-primary rounded-[5px] h-[31px] min-h-[31px] px-2 text-base text-base-100"
        >
          Скачать{' '}
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 14L6.125 9.625L7.35 8.35625L9.625 10.6312V3.5H11.375V10.6312L13.65 8.35625L14.875 9.625L10.5 14ZM5.25 17.5C4.76875 17.5 4.35692 17.3288 4.0145 16.9864C3.67208 16.644 3.50058 16.2318 3.5 15.75V13.125H5.25V15.75H15.75V13.125H17.5V15.75C17.5 16.2312 17.3288 16.6434 16.9864 16.9864C16.644 17.3294 16.2318 17.5006 15.75 17.5H5.25Z"
              fill="white"
            />
          </svg>
        </Link>
      </div>
      {props.approved === null && (
        <div className='flex gap-4'>
          <button onClick={() => mutation.mutate({id: props.id, status: false})} className='btn btn-error p-1 px-2 h-8 min-h-8 rounded-lg font-normal'>Отклонить</button>
          <button onClick={() => mutation.mutate({id: props.id, status: true})}  className='btn btn-success p-1 px-2 h-8 min-h-8 rounded-lg font-normal'>Утвердить</button>
        </div>
      )}
    </div>
  )
}

export default ModeratorRequest
