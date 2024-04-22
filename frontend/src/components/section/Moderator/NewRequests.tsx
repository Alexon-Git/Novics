import { IRequest } from "../../../services/request/request.interface"
import ModeratorRequest from "../../ui/Moderator/ModeratorRequest"

const NewRequests = () => {

  const requests: IRequest[] = [
    {
      user: {
        id: '0',
        firstName: 'John',
        lastName: 'Doe',
        surName: 'smith',
        email: 'john@gmail.com',
        country: null,
        city: null,
        timeZone: null,
        role: 'admin',
        isCheckedByAdmin: true,
        isEmailConfirmed: true,
      },
      doc: {
        id: '0',
        title: 'Документ',
        size: '200',
        date: '8 апреля 2024, 20:20',
        url: 'url',
      }
    },
    {
      user: {
        id: '0',
        firstName: 'John',
        lastName: 'Doe',
        surName: 'smith',
        email: 'different@gmail.com',
        country: null,
        city: null,
        timeZone: null,
        role: 'admin',
        isCheckedByAdmin: true,
        isEmailConfirmed: true,
      },
      doc: {
        id: '0',
        title: 'Документ2',
        size: '200',
        date: '8 апреля 2024, 20:00',
        url: 'url',
      }
    }
  ]
  return (
    <section className="my-20">
      <div className="hero mx-auto container">
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-[36px] font-bold">Новые заявки</h2>
          <div className="flex flex-col justify-between items-center gap-6">
            {requests.map((request, index) => (
              <ModeratorRequest key={index} user={request.user} doc={request.doc} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewRequests