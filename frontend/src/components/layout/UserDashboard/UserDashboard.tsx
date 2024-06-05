import { useAuth } from "../../../hooks/useAuth"
import { useCheckRole } from "../../../hooks/useCheckRole"
import UploadFile from "../../section/User/UploadFile/UploadFile"

const UserDashboard = () => {
  useAuth()
  useCheckRole('user')
  return (
    <div className="py-20">
      <UploadFile />
    </div>
  )
}

export default UserDashboard