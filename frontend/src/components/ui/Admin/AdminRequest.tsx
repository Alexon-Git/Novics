import { IUser } from '../../../services/users/users.interface'

const AdminRequest = ({ props }: { props: IUser }) => {
  return (
    <div className="w-full flex justify-between items-center px-4 py-4 border-[1px] border-primary rounded-[20px]">
      <div className="flex items-center gap-8">
        <h3 className=' font-medium'>{`${props.firstName} ${props.lastName} ${props.surName}`}</h3>
        <p className=' font-light'>{props.email}</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          className={`btn rounded-[9px] min-h-0 h-full text-base font-normal px-2 py-0.5 ${props.role === 'admin' ? 'btn-primary' : 'btn-outline btn-ghost'}`}
        >
          Администратор
        </button>
        <button
          className={`btn rounded-[9px] min-h-0 h-full text-base font-normal px-2 py-0.5 ${props.role === 'moder' ? 'btn-primary' : 'btn-outline btn-ghost'}`}
        >
          Модератор
        </button>
        <button
          className={`btn rounded-[9px] min-h-0 h-full text-base font-normal px-2 py-0.5 ${props.role === 'user' ? 'btn-primary' : 'btn-outline btn-ghost'}`}
        >
          Представитель
        </button>
      </div>
    </div>
  )
}

export default AdminRequest
