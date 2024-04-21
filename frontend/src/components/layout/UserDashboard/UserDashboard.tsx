import { useCheckRole } from "../../../hooks/useCheckRole"

const UserDashboard = () => {
  useCheckRole('user')
  return (
    <div>UserDashboard</div>
  )
}

export default UserDashboard