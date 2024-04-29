import { checkAuth, emailConfirmation, getCurrentUser, logout, signin, signup, updateCurrentUser } from "./user/userActions";

const RootAction = {
  signin,
  signup,
  emailConfirmation,
  logout,
  checkAuth,
  getCurrentUser,
  updateCurrentUser
}

export default RootAction