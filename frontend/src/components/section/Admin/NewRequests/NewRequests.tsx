import { IUser } from '../../../../services/users/users.interface'
import AdminRequest from '../../../ui/Admin/AdminRequest'

const NewRequests = () => {
  const requests: IUser[] = [
    {
      id: 0,
      firstName: 'John',
      lastName: 'Doe',
      surName: 'Smith',
      email: 'john@gmail.com',
      city: 'San Francisco',
      country: 'USA',
      timeZone: null,
      role: 'admin',
      isCheckedByAdmin: true,
      isEmailConfirmed: false,
    },
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      surName: 'Smith',
      email: 'john@gmail.com',
      city: 'San Francisco',
      country: 'USA',
      timeZone: null,
      role: 'moder',
      isCheckedByAdmin: true,
      isEmailConfirmed: false,
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Doe',
      surName: 'Smith',
      email: 'john@gmail.com',
      city: 'San Francisco',
      country: 'USA',
      timeZone: null,
      role: 'user',
      isCheckedByAdmin: true,
      isEmailConfirmed: false,
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
