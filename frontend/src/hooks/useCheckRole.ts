import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useTypedSelector } from './useTypedSelector'

export const useCheckRole = (role: string) => {
  const currentUser = useTypedSelector((state) => state.user.user)
  const navigate = useNavigate()
  useEffect(() => {
    if (currentUser?.role !== "admin") {
      if (!currentUser || currentUser.role !== role) {
        navigate('/')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
