import HomeDocs from '../components/section/HomeDocs/HomeDocs'
import HomeHeader from '../components/section/HomeHeader/HomeHeader'
import HomeNews from '../components/section/HomeNews/HomeNews'
import HomePolls from '../components/section/HomePolls/HomePolls'

const HomePage = () => {
  return (
    <>
      <HomeHeader />
      <HomeNews />
      <HomePolls />
      <HomeDocs />
    </>
  )
}

export default HomePage
