import styles from './page.module.scss'
import { getCommon } from 'shared/lib/pageData/common/common'
import { MainLayout } from 'features/MainLayout/MainLayout'
import { ICommonResponse } from 'shared/lib/pageData/common/common.interface'
import { Banner } from 'widgets/Banner/Banner'
import { getMain } from 'shared/lib/pageData/main/main'
import { IMainPageResponse } from 'shared/lib/pageData/main/main.interface'
import { Directions } from 'widgets/Directions/Directions'
import { Slogan } from 'widgets/Slogan/Slogan'
import { Standards } from 'widgets/Standards/Standards'
import { OurProjects } from 'widgets/OurProjects/OurProjects'
import { AdvantagesAndSpeakers } from 'widgets/AdvantagesAndSpeakers/AdvantagesAndSpeakers'

export default async function Main() {
  const common: ICommonResponse = await getCommon()
  const main: IMainPageResponse = await getMain()
  return (
    <main className={styles.main}>
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
        {/*<Architects*/}
        {/*  id={main.data.attributes.block_arc.id}*/}
        {/*  slider={main.data.attributes.block_arc.slider}*/}
        {/*  title={main.data.attributes.block_arc.title}*/}
        {/*/>*/}
        <OurProjects projects={main.data.attributes.stone_projects.data} />
        <AdvantagesAndSpeakers
          advantages={main.data.attributes.block_advantages}
          speakers={main.data.attributes.block_speakers}
        />
        {/*<AwardsAndHistory*/}
        {/*  awards={main.data.attributes.block_awards}*/}
        {/*  history={main.data.attributes.block_history}*/}
        {/*/>*/}
        {/*<PressCenter news={news.data} />*/}
      </MainLayout>
    </main>
  )
}
