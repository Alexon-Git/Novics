import { Navigate, useParams } from 'react-router-dom'
import AdminDashboard from '../components/layout/AdminDashboard/AdminDashboard'

const Dashboard = () => {
  const params = useParams()
  return (
    <>
      {params.role === 'admin' ? (
        <AdminDashboard />
      ) : params.role === 'moderator' ? (
        <AdminDashboard />
      ) : params.role === 'user' ? (
        <AdminDashboard />
      ) : <Navigate to='/' replace />}
    </>
  )
}

export default Dashboard
