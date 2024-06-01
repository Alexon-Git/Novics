import { IUser } from '../../../../services/users/users.interface'
import AdminRequest from '../../../ui/Admin/AdminRequest'

const NewRequests = () => {
  const requests: IUser[] = [
    {
      id: 0,
      first_name: 'John',
      last_name: 'Doe',
      patronymic: 'Smith',
      email: 'john@gmail.com',
      town: 'San Francisco',
      UTC: null,
      role: 'admin',
      is_active: false,
      is_email_confirmed: false,
    },
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      patronymic: 'Smith',
      email: 'john@gmail.com',
      town: 'San Francisco',
      UTC: null,
      role: 'moder',
      is_active: false,
      is_email_confirmed: false,
    },
    {
      id: 2,
      first_name: 'John',
      last_name: 'Doe',
      patronymic: 'Smith',
      email: 'john@gmail.com',
      town: 'San Francisco',
      UTC: null,
      role: 'user',
      is_active: false,
      is_email_confirmed: false,
    }
  ]
  return (
    <section className="my-20">
      <div className="hero mx-auto container">
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-[36px] font-bold">Новые заявки</h2>
          <div className="flex flex-col justify-between items-center gap-6">
            {requests.map((request) => (
              <AdminRequest key={request.id} props={request} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewRequests
