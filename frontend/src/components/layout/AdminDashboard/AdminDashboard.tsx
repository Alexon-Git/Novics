import { ERole } from "../../../hooks/role.enum"
import { useCheckRole } from "../../../hooks/useCheckRole"

const AdminDashboard = () => {
  useCheckRole(ERole.admin)
  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard