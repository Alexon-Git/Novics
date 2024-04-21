import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ERole } from './role.enum'
import { selectCurrentUser } from '../store/auth/authReducer'

export const useCheckRole = (role: ERole) => {
  const currentUser = useSelector(selectCurrentUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser || currentUser.role < role) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
