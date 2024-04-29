import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import RootAction from '../store/RootAction'

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(RootAction, dispatch)
}
