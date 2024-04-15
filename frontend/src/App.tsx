import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import Footer from './components/layout/Footer/Footer'
import Header from './components/layout/Header/Header'
import HeaderCenter from './components/layout/Header/HeaderCenter/HeaderCenter'

const App = () => {
  return (
    <>
      <Header>
        <HeaderCenter />
      </Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
