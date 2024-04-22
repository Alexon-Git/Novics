import { useCheckRole } from '../../../hooks/useCheckRole'
import NewCreate from '../../section/Moderator/NewCreate'
import NewRequests from '../../section/Moderator/NewRequests'

const ModeratorDashboard = () => {
  useCheckRole('moderator')
  return (
    <div className="py-20">
      <NewRequests />
      <NewCreate />
    </div>
  )
}

export default ModeratorDashboard
