import { useAuth } from '../../../hooks/useAuth'
import { useCheckRole } from '../../../hooks/useCheckRole'
import UpdatePolls from '../../section/Admin/UpdatePolls/UpdatePolls'
import NewCreate from '../../section/Moderator/NewCreate'
import NewRequests from '../../section/Moderator/NewRequests'
import NewsUpdate from '../../section/Moderator/NewsUpdate'
import Accepted from '../../section/User/Accepted/Accepted'

const ModeratorDashboard = () => {
  useAuth()
  useCheckRole(['moderator'])
  return (
    <div className="py-20">
      <NewRequests />
      <NewCreate />
      <NewsUpdate />
      <UpdatePolls />
      <Accepted />
    </div>
  )
}

export default ModeratorDashboard
