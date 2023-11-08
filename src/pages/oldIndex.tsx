import { onMessageListener } from 'src/shared/services/PusherInit'
import ReactNotificationComponent from 'src/features/Notifications/ReactNotification'
import { FC, useState } from 'react'
import { MainLayout } from 'src/layouts/MainLayout'
import { Standards } from 'src/features/mainPage/Standards'
import { Directions } from 'src/features/mainPage/Directions/Directions'
import { Slogan } from 'src/features/mainPage/Slogan/Slogan'
import { OurProjects } from 'src/features/mainPage/OurProjects'
import { Architects } from 'src/features/mainPage/Architects'
import { PressCenter } from 'src/shared/components/PressCenter/PressCenter'
import { AwardsAndHistory } from 'src/features/mainPage/AwardsAndHistory'
import { AdvantagesAndSpeakers } from 'src/features/mainPage/AdvantagesAndSpeakers'
import { Banner } from 'src/features/mainPage/Banner/Banner'
import { IMainPageResponse } from 'src/shared/services/pageData/main/main.interface'
import { INewsResponse } from 'src/shared/services/pageData/news/news.interface'
import { ICommonResponse } from 'src/shared/services/pageData/common/common.interface'
import { getMain } from 'src/shared/services/pageData/main/main'
import { getNews } from 'src/shared/services/pageData/news/news'
import { getCommon } from 'src/shared/services/pageData/common/common'
import HeadSeo from 'src/features/headSeo/HeadSeo'

export interface IMainProps {
  main: IMainPageResponse
  news: INewsResponse
  common: ICommonResponse
}

const Main: FC<IMainProps> = ({ main, news, common }) => {
  const [show, setShow] = useState(false)
  const [notification, setNotification] = useState({ title: '', body: '' })

  onMessageListener().then((message: any) => {
    setShow(true)
    setNotification({
      title: message.title,
      body: message.message,
    })
  })

  return (
    <>
      {show ? (
        <ReactNotificationComponent title={notification.title} body={notification.body} />
      ) : (
        <></>
      )}

      <HeadSeo />

      <MainLayout common={common.data.attributes}>
        <Banner slider={main.data.attributes.block_slider} />
        <Directions directions={main.data.attributes.block_directions} />
        <Slogan
          id={main.data.attributes.block_slogan.id}
          text={main.data.attributes.block_slogan.text}
          title={main.data.attributes.block_slogan.title}
        />
        <Standards
          id={main.data.attributes.block_standarts.id}
          title={main.data.attributes.block_standarts.title}
          standarts={main.data.attributes.block_standarts.standarts}
        />
        <Architects
          id={main.data.attributes.block_arc.id}
          slider={main.data.attributes.block_arc.slider}
          title={main.data.attributes.block_arc.title}
        />
        <OurProjects projects={main.data.attributes.stone_projects.data} />
        <AdvantagesAndSpeakers
          advantages={main.data.attributes.block_advantages}
          speakers={main.data.attributes.block_speakers}
        />
        <AwardsAndHistory
          awards={main.data.attributes.block_awards}
          history={main.data.attributes.block_history}
        />
        <PressCenter news={news.data} />
      </MainLayout>
    </>
  )
}

export default Main

export const getStaticProps = async () => {
  const mainData: IMainPageResponse = await getMain()
  const newsData: INewsResponse = await getNews()
  const commonData: ICommonResponse = await getCommon()

  return {
    props: {
      main: mainData,
      news: newsData,
      common: commonData,
    },
    revalidate: 120,
  }
}
