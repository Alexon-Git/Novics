import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { RootStore } from '../store'

export const useIsAuth = () => {
  const currentUser = useSelector((state: RootStore) => state.user)
  const navigate = useNavigate()
  useEffect(() => {
    if (!currentUser.user) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
