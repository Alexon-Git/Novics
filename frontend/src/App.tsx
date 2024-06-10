import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import Footer from './components/layout/Footer/Footer'
import Header from './components/layout/Header/Header'
import HeaderCenter from './components/layout/Header/HeaderCenter/HeaderCenter'
import HeaderLeft from './components/layout/Header/HeaderLeft/HeaderLeft'
import HeaderRight from './components/layout/Header/HeaderRight/HeaderRight'
import SignModal from './components/modals/SignModal/SignModal'
import { useEffect, useRef } from 'react'
import autoAnimate from '@formkit/auto-animate'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import EmailConfirmationModal from './components/modals/EmailConfirmationModal/EmailConfirmationModal'
import AdminConfirmationModal from './components/modals/AdminConfirmationModal/AdminConfirmationModal'
// import { useTypedSelector } from './hooks/useTypedSelector'
import { useActions } from './hooks/useActions'

const App = () => {
  const parent = useRef(null)
  // const { user } = useTypedSelector((state) => state.user)
  const { getCurrentUser } = useActions()

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  useEffect(() => {
      getCurrentUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Header>
        <HeaderLeft />
        <HeaderCenter />
        <HeaderRight />
      </Header>
      <div ref={parent}>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard/:role" element={<Dashboard />} />
        </Routes>
        <SignModal />
        <EmailConfirmationModal />
        <AdminConfirmationModal />
      </div>
      <Footer />
    </>
  )
}

export default App
