import { ERole } from "../../../hooks/role.enum"
import { useCheckRole } from "../../../hooks/useCheckRole"

const ModeratorDashboard = () => {
  useCheckRole(ERole.moderator)
  return (
    <div>ModeratorDashboard</div>
  )
}

export default ModeratorDashboard