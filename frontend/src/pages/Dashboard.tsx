import { Navigate, useParams } from 'react-router-dom'
import AdminDashboard from '../components/layout/AdminDashboard/AdminDashboard'
import ModeratorDashboard from '../components/layout/ModeratorDashboard/ModeratorDashboard'
import UserDashboard from '../components/layout/UserDashboard/UserDashboard'
import { Helmet } from 'react-helmet-async'

const Dashboard = () => {
  const params = useParams()
  return (
    <>
      <Helmet>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/dashboard/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/dashboard/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/dashboard/favicon-16x16.png"
        />
        <link rel="manifest" href="/dashboard/site.webmanifest" />
      </Helmet>
      {params.role === 'admin' ? (
        <AdminDashboard />
      ) : params.role === 'moderator' ? (
        <ModeratorDashboard />
      ) : params.role === 'user' ? (
        <UserDashboard />
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  )
}

export default Dashboard
