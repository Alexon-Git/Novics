import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { RootStore } from '../store'

export const useCheckRole = (role: string) => {
  const currentUser = useSelector((state: RootStore) => state.user.user)
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
