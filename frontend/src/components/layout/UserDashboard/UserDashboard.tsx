import { ERole } from "../../../hooks/role.enum"
import { useCheckRole } from "../../../hooks/useCheckRole"

const UserDashboard = () => {
  useCheckRole(ERole.user)
  return (
    <div>UserDashboard</div>
  )
}

export default UserDashboard