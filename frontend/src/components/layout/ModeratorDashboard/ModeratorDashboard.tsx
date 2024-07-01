import { Helmet } from 'react-helmet-async'
import { useAuth } from '../../../hooks/useAuth'
import { useCheckRole } from '../../../hooks/useCheckRole'
import UpdatePolls from '../../section/Admin/UpdatePolls/UpdatePolls'
import ModeratorAccepted from '../../section/Moderator/ModeratorAccepted'
import NewCreate from '../../section/Moderator/NewCreate'
import NewRequests from '../../section/Moderator/NewRequests'
import NewsUpdate from '../../section/Moderator/NewsUpdate'

const ModeratorDashboard = () => {
  useAuth()
  useCheckRole(['moderator'])
  return (
    <div className="py-20">
      <Helmet>
        <title>Модератор</title>
      </Helmet>
      <NewRequests />
      <NewCreate />
      <NewsUpdate />
      <UpdatePolls />
      <ModeratorAccepted />
    </div>
  )
}

export default ModeratorDashboard
