import { useAuth } from "../../../hooks/useAuth"
import { useCheckRole } from "../../../hooks/useCheckRole"
import Accepted from "../../section/User/Accepted/Accepted"
import NotAccepted from "../../section/User/NotAccepted/NotAccepted"
import UploadFile from "../../section/User/UploadFile/UploadFile"

const UserDashboard = () => {
  useAuth()
  useCheckRole('user')
  return (
    <div className="py-20">
      <UploadFile />
      <NotAccepted />
      <Accepted />
    </div>
  )
}

export default UserDashboard