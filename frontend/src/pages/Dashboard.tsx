import { Navigate, useParams } from 'react-router-dom'
import AdminDashboard from '../components/layout/AdminDashboard/AdminDashboard'
import ModeratorDashboard from '../components/layout/ModeratorDashboard/ModeratorDashboard'
import UserDashboard from '../components/layout/UserDashboard/UserDashboard'

const Dashboard = () => {
  const params = useParams()
  return (
    <>
      {params.role === 'admin' ? (
        <AdminDashboard />
      ) : params.role === 'moderator' ? (
        <ModeratorDashboard />
      ) : params.role === 'user' ? (
        <UserDashboard />
      ) : <Navigate to='/' replace />}
    </>
  )
}

export default Dashboard
