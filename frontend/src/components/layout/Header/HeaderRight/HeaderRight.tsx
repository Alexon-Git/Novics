import { useDispatch } from "react-redux"
import { openSignInModal } from "../../../../store/modals/modalReducer"

const HeaderRight = () => {
  const dispatch = useDispatch()
  return (
    <div className="navbar-end">
      <button onClick={() => dispatch(openSignInModal())} className="btn btn-secondary text-base-100 px-6">Войти</button>
    </div>
  )
}

export default HeaderRight
