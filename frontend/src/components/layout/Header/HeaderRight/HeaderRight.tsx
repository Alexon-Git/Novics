import { useDispatch, useSelector } from "react-redux"
import { openSignInModal } from "../../../../store/modals/modalReducer"
import { selectCurrentUser } from "../../../../store/auth/authReducer"
import DropDown from "../../../ui/dropdown/DropDown"

const HeaderRight = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  return (
    <div className="navbar-end">
      {currentUser ? <button onClick={() => dispatch(openSignInModal())} className="btn btn-secondary text-base-100 px-6">Войти</button> : <DropDown />}
    </div>
  )
}

export default HeaderRight
