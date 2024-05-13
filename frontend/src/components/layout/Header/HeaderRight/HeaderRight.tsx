import { useDispatch } from "react-redux"
import { openSignInModal } from "../../../../store/modals/modalReducer"
import ProfileLink from "../../../ui/ProfileLink/ProfileLink"
import { useTypedSelector } from "../../../../hooks/useTypedSelector"

const HeaderRight = () => {
  const dispatch = useDispatch()
  const currentUser = useTypedSelector((state) => state.user.user)
  return (
    <div className="navbar-end">
      {!currentUser || !currentUser.isCheckedByAdmin || !currentUser.isEmailConfirmed ? <button onClick={() => dispatch(openSignInModal())} className="btn btn-secondary text-base-100 px-6">Личный кабинет</button> : <ProfileLink />}
    </div>
  )
}

export default HeaderRight
