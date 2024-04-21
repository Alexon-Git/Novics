import { useDispatch, useSelector } from "react-redux"
import { openSignInModal } from "../../../../store/modals/modalReducer"
import ProfileLink from "../../../ui/ProfileLink/ProfileLink"
import { RootStore } from "../../../../store"

const HeaderRight = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: RootStore) => state.user.user)
  return (
    <div className="navbar-end">
      {!currentUser ? <button onClick={() => dispatch(openSignInModal())} className="btn btn-secondary text-base-100 px-6">Войти</button> : <ProfileLink />}
    </div>
  )
}

export default HeaderRight
