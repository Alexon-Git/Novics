import { Helmet } from 'react-helmet-async'
import HomeDocs from '../components/section/HomeDocs/HomeDocs'
import HomeHeader from '../components/section/HomeHeader/HomeHeader'
import HomeNews from '../components/section/HomeNews/HomeNews'
import HomePolls from '../components/section/HomePolls/HomePolls'

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Новис</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
        <meta
          name="description"
          content="Система аналитики студентов. Данный сайт предназначен для автоматизации ведения отчетов по иностранным студентам. "
        />
      </Helmet>
      <HomeHeader />
      <HomeNews />
      <HomePolls />
      <HomeDocs />
    </>
  )
}

export default HomePage
