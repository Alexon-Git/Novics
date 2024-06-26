import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IUser } from '../../../services/users/users.interface'
import { Bounce, toast } from 'react-toastify'
import { UserService } from '../../../services/users/users.service'

const AdminRequest = ({ props }: { props: IUser }) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: UserService.setRoleById,
    onError: (error) => {
      toast.error(`Ошибка изменения роли ${props.first_name} (${error.message})`, {
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
      toast.success(`Роль ${props.first_name} ${props.last_name} успешно изменена!`, {
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
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['usersWithFilter'] })
    }
  })
  return (
    <div className="w-full text-xs md:text-base flex gap-4 justify-between items-center px-4 py-4 border-[1px] border-primary rounded-[20px] md:gap-0">
      <div className="flex items-center gap-8">
        <h3 className=" font-medium">{`${props.first_name} ${props.last_name} ${props.patronymic}`}</h3>
        <p className=" font-light">{props.email}</p>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {mutation.isPending ? (
          <div role="status">
            <span className="loading loading-spinner text-primary"></span>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <>
            <button
              onClick={() => {
                mutation.mutate({ id: props.id, role: 'admin' })
              }}
              className={`btn rounded-[9px] min-h-0 h-full text-xs md:text-base font-normal px-2 py-0.5 ${props.role === 'admin' ? 'btn-primary' : 'btn-outline btn-ghost'}`}
            >
              Администратор
            </button>
            <button
              onClick={() => {
                mutation.mutate({ id: props.id, role: 'moderator' })
              }}
              className={`btn rounded-[9px] min-h-0 h-full text-xs md:text-base font-normal px-2 py-0.5 ${props.role === 'moderator' ? 'btn-primary' : 'btn-outline btn-ghost'}`}
            >
              Модератор
            </button>
            <button
              onClick={() => {
                mutation.mutate({ id: props.id, role: 'user' })
              }}
              className={`btn rounded-[9px] min-h-0 h-full text-xs md:text-base font-normal px-2 py-0.5 ${props.role === 'user' ? 'btn-primary' : 'btn-outline btn-ghost'}`}
            >
              Представитель
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminRequest
