import { useCheckRole } from '../../../hooks/useCheckRole'
import UpdatePolls from '../../section/Admin/UpdatePolls/UpdatePolls'
import NewCreate from '../../section/Moderator/NewCreate'
import NewRequests from '../../section/Moderator/NewRequests'

const ModeratorDashboard = () => {
  useCheckRole('moderator')
  return (
    <div className="py-20">
      <NewRequests />
      <NewCreate />
      <UpdatePolls />
    </div>
  )
}

export default ModeratorDashboard
