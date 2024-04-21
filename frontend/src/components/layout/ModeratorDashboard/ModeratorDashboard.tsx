import { useCheckRole } from '../../../hooks/useCheckRole'

const ModeratorDashboard = () => {
  useCheckRole('moderator')
  return <div>ModeratorDashboard</div>
}

export default ModeratorDashboard
