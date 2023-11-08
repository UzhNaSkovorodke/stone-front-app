import { FC, useState } from 'react'
import { MainLayout } from 'src/layouts/MainLayout'
import { PressCenter } from 'src/shared/components/PressCenter/PressCenter'
import { Cards } from 'src/shared/components/Cards/Cards'
import { AdvantagesAndSpeakers } from 'src/features/residentialPage/AdvantagesAndSpeakers/AdvantagesAndSpeakers'
import { Filter } from 'src/features/residentialPage/Filter/Filter'
import { Projects } from 'src/features/residentialPage/Projects'
import { useClientWidth } from 'src/shared/hooks/useClientWidth'
import Link from 'next/link'
import classes from './styles.module.scss'
import { IDefaultPStatuses } from 'src/shared/services/pageData/default/default.interface'
import { IResidentialPageResponse } from 'src/shared/services/pageData/dom/dom.interface'
import { INewsResponse } from 'src/shared/services/pageData/news/news.interface'
import { ICommonResponse } from 'src/shared/services/pageData/common/common.interface'
import { getDom } from 'src/shared/services/pageData/dom/dom'
import { getNews } from 'src/shared/services/pageData/news/news'
import { getCommon } from 'src/shared/services/pageData/common/common'
import { getProjectStatuses } from 'src/shared/services/pageData/projectStatuses/projectStatuses'
import { useInView } from 'react-intersection-observer'
import { CookieValueTypes } from 'cookies-next'
import HeadSeo from 'src/features/headSeo/HeadSeo'
import { Icon } from 'src/shared/uikit/Icon'

export enum ProjectsSwitcherTabs {
  LIST = 'Список',
  MAP = 'Карта',
}

export interface IResidentialProps {
  residential: IResidentialPageResponse
  news: INewsResponse
  common: ICommonResponse
  projectStatuses: IDefaultPStatuses
}

const Residential: FC<IResidentialProps> = ({ residential, news, common, projectStatuses }) => {
  const clientWidth = useClientWidth()
  const isMobileView = clientWidth <= 767
  const [isFooter, setIsFooter] = useState<boolean>(false)
  const [isCookiesAccepted, setIsCookiesAccepted] = useState<CookieValueTypes>(true)
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: true,
  })

  const [projectsActiveSwitch, setProjectsActiveSwitch] = useState<ProjectsSwitcherTabs>(
    ProjectsSwitcherTabs.LIST
  )

  const handleCloseProjectsPresentationMap = () =>
    setProjectsActiveSwitch(ProjectsSwitcherTabs.LIST)

  const handleOpenProjectsPresentationMap = () => setProjectsActiveSwitch(ProjectsSwitcherTabs.MAP)

  const setCookieAccepted = (isAccepted: CookieValueTypes): void => {
    setIsCookiesAccepted(isAccepted)
  }

  return (
    <>
      <HeadSeo title={'Жилая недвижимость'} />

      <MainLayout
        common={common.data.attributes}
        activeTabHeader="dom"
        setIsFooter={setIsFooter}
        isAcceptedCookie={setCookieAccepted}>
        <div ref={ref}>
          <Filter
            mainInformation={residential.data.attributes.BlockMain}
            filterInformation={residential.data.attributes.BlockAction}
          />
        </div>

        <Cards cards={residential.data.attributes.BlockPromo} />

        <Projects
          projects={residential.data.attributes.stone_projects.data}
          // propertyServiceBanner={residential.data.attributes.block_mortgage_calc} //todo: revgenov перенесли блок ипотечного кальк. на следующую итерацию
          stoneBanner={residential.data.attributes.BlockPromoMiddle}
          projectsActiveSwitch={projectsActiveSwitch}
          projectStatuses={projectStatuses}
          onCloseProjectsPresentationMap={handleCloseProjectsPresentationMap}
          onOpenProjectsPresentationMap={handleOpenProjectsPresentationMap}
        />

        <AdvantagesAndSpeakers
          advantages={residential.data.attributes.Advantages}
          speakers={residential.data.attributes.BlockSpeakers}
        />

        <PressCenter news={news.data} />

        {!inView && isMobileView && (
          <div
            className={`${
              classes[isFooter ? 'projects-navigation--hide' : 'projects-navigation']
            } ${classes[isCookiesAccepted ? '' : 'projects-navigation_up']}`}
            style={{ zIndex: projectsActiveSwitch === ProjectsSwitcherTabs.MAP ? 50 : 10 }}>
            <div
              className={classes['projects-navigation__icon']}
              onClick={handleOpenProjectsPresentationMap}>
              <Icon name="globe" />
            </div>

            <hr className={classes['projects-navigation__line']} />

            {/* setTimeout adds smooth shifting */}
            <Link
              scroll={false}
              className={classes['projects-navigation__icon']}
              href={'#top'}
              onClick={
                projectsActiveSwitch === ProjectsSwitcherTabs.MAP
                  ? () => setTimeout(handleCloseProjectsPresentationMap, 100)
                  : () => null
              }>
              <Icon name="settingsBlack" />
            </Link>
          </div>
        )}
      </MainLayout>
    </>
  )
}

export default Residential

export const getStaticProps = async () => {
  const domData: IResidentialPageResponse = await getDom({
    queryParams:
      'populate[BlockMain][populate][button]=text&populate[BlockPromo][populate][button]=title&' +
      'populate[BlockPromoMiddle][populate][button]=title&populate[Advantages][populate][slider]=title]&' +
      'populate[BlockSpeakers][populate][speakers][populate][img]=url&populate[BlockAction][populate][img]=url&' +
      'populate[BlockAction][populate][button]=text&populate[stone_projects][populate][extraImg]=url&' +
      'populate[stone_projects][populate][pstatus]=title&populate[stone_projects][populate][features]=feature&' +
      'populate[stone_projects][populate][geo]=lat&populate[stone_projects][populate][metro]=station',
  })
  const newsData: INewsResponse = await getNews()
  const commonData: ICommonResponse = await getCommon()
  const projectStatuses: IDefaultPStatuses = await getProjectStatuses()

  return {
    props: {
      residential: domData,
      news: newsData,
      common: commonData,
      projectStatuses,
    },
    revalidate: 120,
  }
}
