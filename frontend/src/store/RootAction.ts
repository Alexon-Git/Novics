import {
  getCurrentUser,
  logout,
  sendOtp,
  signin,
  signup,
  updateCurrentUser,
  verifyOtp
} from './user/userActions'

const RootAction = {
  signin,
  signup,
  logout,
  getCurrentUser,
  updateCurrentUser,
  sendOtp,
  verifyOtp
}

export default RootAction
