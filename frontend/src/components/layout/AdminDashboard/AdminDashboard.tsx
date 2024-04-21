import { useCheckRole } from '../../../hooks/useCheckRole'
import NewRequests from '../../section/Admin/NewRequests/NewRequests'
import SearchByUser from '../../section/Admin/SearchByUsers/SearchByUser'
import UpdatePolls from '../../section/Admin/UpdatePolls/UpdatePolls'

const AdminDashboard = () => {
  useCheckRole('admin')
  return (
    <div className='py-20'>
      <NewRequests />
      <SearchByUser />
      <UpdatePolls />
    </div>
  )
}

export default AdminDashboard
