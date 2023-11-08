import { FC, useState } from 'react'
import { IPropertyService, MainLayout } from 'src/layouts/MainLayout'
import { PressCenter } from 'src/shared/components/PressCenter/PressCenter'
import { Cards } from 'src/shared/components/Cards/Cards'
import { Projects } from 'src/features/commercialPage/Projects'
import { AdvantagesAndSpeakers } from 'src/features/commercialPage/AdvantagesAndSpeakers/AdvantagesAndSpeakers'
import { Filter } from 'src/features/commercialPage/Filter/Filter'
import { useClientWidth } from 'src/shared/hooks/useClientWidth'
import Link from 'next/link'
import classes from './styles.module.scss'
import { IDefaultPStatuses } from 'src/shared/services/pageData/default/default.interface'
import { IOfficeResponse } from 'src/shared/services/pageData/office/office.interface'
import { ICommonResponse } from 'src/shared/services/pageData/common/common.interface'
import { INewsResponse } from 'src/shared/services/pageData/news/news.interface'
import { getNews } from 'src/shared/services/pageData/news/news'
import { getCommon } from 'src/shared/services/pageData/common/common'
import { getOffice } from 'src/shared/services/pageData/office/office'
import { getProjectStatuses } from 'src/shared/services/pageData/projectStatuses/projectStatuses'
import { getPropertyService } from 'src/shared/services/pageData/propertyService/propertyService'
import { IPropertyServiceResponse } from 'src/shared/services/pageData/propertyService/propertyService.interface'
import { useInView } from 'react-intersection-observer'
import { CookieValueTypes } from 'cookies-next'
import HeadSeo from 'src/features/headSeo/HeadSeo'
import { Icon } from 'src/shared/uikit/Icon'

export enum ProjectsSwitcherTabs {
  LIST = 'Список',
  MAP = 'Карта',
}

export interface ICommercialProps {
  news: INewsResponse
  common: ICommonResponse
  office: IOfficeResponse
  projectStatuses: IDefaultPStatuses
  propertyService: IPropertyServiceResponse
}

const Commercial: FC<ICommercialProps> = ({
  office,
  news,
  common,
  projectStatuses,
  propertyService,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    initialInView: true,
  })

  const clientWidth = useClientWidth()
  const isDesktopView = clientWidth > 1023
  const [isFooter, setIsFooter] = useState<boolean>(false)
  const [isCookiesAccepted, setIsCookiesAccepted] = useState<CookieValueTypes>(true)

  const [projectsActiveSwitch, setProjectsActiveSwitch] = useState<ProjectsSwitcherTabs>(
    ProjectsSwitcherTabs.LIST
  )
  const [isOpenPropertyService, setIsOpenPropertyService] = useState<boolean>(false)

  const togglePropertyServiceModal = (isOpen: boolean) => {
    setIsOpenPropertyService(isOpen)
  }

  const handleCloseProjectsPresentationMap = () =>
    setProjectsActiveSwitch(ProjectsSwitcherTabs.LIST)

  const handleOpenProjectsPresentationMap = () => setProjectsActiveSwitch(ProjectsSwitcherTabs.MAP)

  const propertyServiceInfo: IPropertyService = {
    propertyServiceData: propertyService,
    propertyServiceState: {
      isOpen: isOpenPropertyService,
      openProperty: togglePropertyServiceModal,
    },
  }

  const setCookieAccepted = (isAccepted: CookieValueTypes): void => {
    setIsCookiesAccepted(isAccepted)
  }

  return (
    <>
      <HeadSeo title={'Коммерческие проекты'} />

      <MainLayout
        common={common.data.attributes}
        activeTabHeader="office"
        setIsFooter={setIsFooter}
        propertyService={propertyServiceInfo}
        isAcceptedCookie={setCookieAccepted}>
        <div ref={ref}>
          <Filter
            mainInformation={office.data.attributes.BlockMain}
            filterInformation={office.data.attributes.BlockFilter}
          />
        </div>

        <Cards cards={office.data.attributes.BlockPromo} />

        <Projects
          projects={office.data.attributes.stone_projects.data}
          projectsActiveSwitch={projectsActiveSwitch}
          onCloseProjectsPresentationMap={handleCloseProjectsPresentationMap}
          onOpenProjectsPresentationMap={handleOpenProjectsPresentationMap}
          projectStatuses={projectStatuses}
          propertyServiceBanner={office.data.attributes.BlockPromoMiddle}
          stoneBanner={office.data.attributes.BlockPromoBottom}
          openPropertyService={togglePropertyServiceModal}
        />

        <AdvantagesAndSpeakers
          advantages={office.data.attributes.Advantages}
          speakers={office.data.attributes.BlockSpeakers}
        />

        <PressCenter news={news.data} />

        {!inView && (
          <div
            className={`${
              classes[isFooter ? 'projects-navigation--hide' : 'projects-navigation']
            } ${classes[isCookiesAccepted || clientWidth >= 1440 ? '' : 'projects-navigation_up']}`}
            style={{ zIndex: projectsActiveSwitch === ProjectsSwitcherTabs.MAP ? 50 : 10 }}>
            <Link
              scroll={false}
              className={classes['projects-navigation__icon']}
              href={'#map'}
              onClick={handleOpenProjectsPresentationMap}>
              <Icon s="24" name="globe" />
              {isDesktopView && (
                <p
                  className={classes['projects-navigation__title']}
                  style={{ marginRight: '16px' }}>
                  На карте
                </p>
              )}
            </Link>

            <hr className={classes['projects-navigation__line']} />

            <Link
              scroll={false}
              className={classes['projects-navigation__icon']}
              href={'#top'}
              onClick={
                projectsActiveSwitch === ProjectsSwitcherTabs.MAP
                  ? () => setTimeout(handleCloseProjectsPresentationMap, 100)
                  : () => null
              }>
              {isDesktopView && (
                <p className={classes['projects-navigation__title']} style={{ marginLeft: '16px' }}>
                  Фильтры
                </p>
              )}
              <Icon name="settingsBlack" />
            </Link>
          </div>
        )}
      </MainLayout>
    </>
  )
}

export default Commercial

export const getStaticProps = async () => {
  const newsData: INewsResponse = await getNews()
  const commonData: ICommonResponse = await getCommon()
  const officeData: IOfficeResponse = await getOffice({
    queryParams:
      'populate[BlockMain][populate][button]=title&populate[BlockFilter]=text&' +
      'populate[BlockPromo][populate][button]=title&populate[BlockPromoMiddle][populate][button]=title&' +
      'populate[BlockPromoBottom][populate][button]=title&populate[Advantages][populate][slider]=text&' +
      'populate[BlockSpeakers][populate][speakers][populate][img]=url&populate[stone_projects][populate][extraImg]=url&' +
      'populate[stone_projects][populate][metro]=station&populate[stone_projects][populate][geo]=lat&' +
      'populate[stone_projects][populate][pstatus]=title&populate[stone_projects][populate][features]=feature',
  })

  const projectStatuses: IDefaultPStatuses = await getProjectStatuses()
  const propertyService: IPropertyServiceResponse = await getPropertyService()

  return {
    props: {
      news: newsData,
      common: commonData,
      office: officeData,
      projectStatuses,
      propertyService,
    },
    revalidate: 120,
  }
}
