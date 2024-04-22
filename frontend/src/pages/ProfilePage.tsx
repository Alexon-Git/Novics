import { useSelector } from "react-redux"
import { RootStore } from "../store"
import SettingForm from "../components/ui/form/SettingForm"
import { useIsAuth } from "../hooks/useIsAuth"

const ProfilePage = () => {
  const currentUser = useSelector((state: RootStore) => state.user.user)
  useIsAuth()
  return (
    <div className="py-20">
      <section className="my-20">
        <div className="hero mx-auto container">
          <div className="w-full flex flex-col gap-16">
            <h2 className="text-2xl font-extralight">{`${currentUser?.firstName} ${currentUser?.lastName} ${currentUser?.surName}`}</h2>
            <SettingForm props={currentUser}/>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProfilePage
