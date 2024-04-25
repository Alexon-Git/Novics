import SettingForm from "../components/ui/form/SettingForm"
import { useAuth } from "../hooks/useAuth"
import { useTypedSelector } from "../hooks/useTypedSelector"

const ProfilePage = () => {
  const currentUser = useTypedSelector((state) => state.user.user)
  useAuth()
  return (
    <div className="py-20">
      <section className="my-20">
        <div className="hero mx-auto container">
          <div className="w-full flex flex-col gap-16">
            <h2 className="text-2xl font-extralight">{`${currentUser?.firstName} ${currentUser?.lastName} ${currentUser?.surName}`}</h2>
            {currentUser && <SettingForm props={currentUser}/>}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProfilePage
