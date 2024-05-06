import { useAuth } from "../../../hooks/useAuth"
import { useCheckRole } from "../../../hooks/useCheckRole"

const UserDashboard = () => {
  useAuth()
  useCheckRole('user')
  return (
    <div>UserDashboard</div>
  )
}

export default UserDashboard