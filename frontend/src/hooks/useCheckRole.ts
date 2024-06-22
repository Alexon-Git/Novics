import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useTypedSelector } from './useTypedSelector'

export const useCheckRole = (roles: string[]) => {
  const currentUser = useTypedSelector((state) => state.user.user)
  const navigate = useNavigate()
  useEffect(() => {
    if (
      !currentUser ||
      (currentUser.role &&
        !roles.includes(currentUser.role) &&
        currentUser.role !== 'admin')
    )
      navigate('/')
  }, [currentUser, navigate, roles])
}
