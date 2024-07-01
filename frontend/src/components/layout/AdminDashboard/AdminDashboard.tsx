import { Helmet } from 'react-helmet-async'
import { useAuth } from '../../../hooks/useAuth'
import { useCheckRole } from '../../../hooks/useCheckRole'
import NewRequests from '../../section/Admin/NewRequests/NewRequests'
import SearchByUser from '../../section/Admin/SearchByUsers/SearchByUser'
import UpdatePolls from '../../section/Admin/UpdatePolls/UpdatePolls'

const AdminDashboard = () => {
  useAuth()
  useCheckRole(['admin'])
  return (
    <div className="py-20">
      <Helmet>
        <title>Администратор</title>
      </Helmet>
      <NewRequests />
      <SearchByUser />
      <UpdatePolls />
    </div>
  )
}

export default AdminDashboard
