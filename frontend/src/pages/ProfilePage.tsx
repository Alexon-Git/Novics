import { Helmet } from 'react-helmet-async'
import SettingForm from '../components/ui/form/SettingForm'
import { useAuth } from '../hooks/useAuth'
import { useTypedSelector } from '../hooks/useTypedSelector'

const ProfilePage = () => {
  const currentUser = useTypedSelector((state) => state.user.user)
  useAuth()
  return (
    <div className="py-20">
      <Helmet>
        <title>Настройки</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/profile/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/profile/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/profile/favicon-16x16.png"
        />
        <link rel="manifest" href="/profile/site.webmanifest" />
      </Helmet>
      <section className="my-20">
        <div className="hero mx-auto container">
          <div className="w-full flex flex-col gap-16">
            <h2 className="text-2xl font-extralight">{`${currentUser?.first_name} ${currentUser?.last_name} ${currentUser?.patronymic}`}</h2>
            {currentUser && <SettingForm props={currentUser} />}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProfilePage
