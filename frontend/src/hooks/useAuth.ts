import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useTypedSelector } from './useTypedSelector'

export const useAuth = () => {
  const currentUser = useTypedSelector((state) => state.user)
  const navigate = useNavigate()
  useEffect(() => {
    if (!currentUser.user) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
