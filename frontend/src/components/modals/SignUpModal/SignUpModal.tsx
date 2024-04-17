import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../../store";

const SignUpModal = (props: Props) => {
  const dispatch = useDispatch();
  const isSignUpModalOpen = useSelector(
    (state: RootStore) => state.modalReducer.isSignInModalOpen
  );
  return <div>SignUpModal</div>
}

export default SignUpModal
