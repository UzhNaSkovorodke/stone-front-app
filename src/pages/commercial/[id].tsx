import { FC, useState } from 'react'
import { IPropertyService, MainLayout } from 'src/layouts/MainLayout'
import { AdvantagesProject } from 'src/shared/components/AdvantagesProject/AdvantagesProject'
import { ProjectCharacteristics } from 'src/shared/components/ProjectCharacteristics/ProjectCharacteristics'
import { Investments } from 'src/features/commercialDetailsPage/Investments/Investments'
import { ConstructionProgress } from 'src/features/commercialDetailsPage/ConstructionProgress/ConstructionProgress'
import { AboutProjects } from 'src/features/commercialDetailsPage/AboutProjects/AboutProjects'
import { IntroductoryTextWithVideo } from 'src/shared/components/IntroductoryTextWithVideo/IntroductoryTextWithVideo'
import { PlanningSolutions } from 'src/features/commercialDetailsPage/PlanningSolutions/PlanningSolutions'
import InfrastructureMap from 'src/shared/components/map/InfrastructureMap'
import { GetServerSideProps, GetStaticPaths } from 'next'
import { ICommercialProjectData } from 'src/shared/services/pageData/commercialProject/commercialProject.interface'
import { ICommonResponse } from 'src/shared/services/pageData/common/common.interface'
import { getCommon } from 'src/shared/services/pageData/common/common'
import {
  getCommercialProject,
  getCommercialProjects,
} from 'src/shared/services/pageData/commercialProject/commercialProject'
import { getPropertyService } from 'src/shared/services/pageData/propertyService/propertyService'
import { IPropertyServiceResponse } from 'src/shared/services/pageData/propertyService/propertyService.interface'
import { IPointTypesResponse } from 'src/shared/services/pageData/pointTypes/pointTypes.interface'
import { getPointTypes } from 'src/shared/services/pageData/pointTypes/pointTypes'
import { ModalPresentation } from 'src/shared/components/ModalPresentention/ModalPresentation'
import HeadSeo from 'src/features/headSeo/HeadSeo'
import { Form } from 'src/shared/components/Form/Form'
import { EFormPageType } from 'src/shared/components/Form/FormPage/FormPage'

export interface ICommercialProps {
  common: ICommonResponse
  commercialProject: ICommercialProjectData
  propertyService: IPropertyServiceResponse
  pointTypes: IPointTypesResponse
}

const CommercialDetails: FC<ICommercialProps> = ({
  common,
  commercialProject,
  propertyService,
  pointTypes,
}) => {
  const isBlockSolution = commercialProject?.attributes.BlockSolutions
  let isSold: boolean =
    commercialProject?.attributes.project.data?.attributes.pstatus.data.attributes.slug ===
    'prodano'
  const [isOpenPropertyService, setIsOpenPropertyService] = useState<boolean>(false)
  const [isOpenPresentation, setIsOpenPresentation] = useState(false)
  const propertyServiceInfo: IPropertyService = {
    propertyServiceData: propertyService,
    propertyServiceState: {
      isOpen: isOpenPropertyService,
      openProperty: setIsOpenPropertyService,
    },
  }

  const openPropertyService = (isOpen: boolean) => {
    setIsOpenPropertyService(isOpen)
  }
  if (!common || !commercialProject || !propertyService || !pointTypes) return null

  return (
    <>
      <HeadSeo />

      <MainLayout
        common={common.data?.attributes}
        activeTabHeader={'office'}
        propertyService={propertyServiceInfo}>
        <AboutProjects
          slider={commercialProject?.attributes.BlockMain}
          project={commercialProject?.attributes.project}
          isSold={isSold}
        />

        {!isSold && isBlockSolution && (
          <PlanningSolutions
            projectId={commercialProject?.attributes.project.data?.attributes.portalUuid}
            projectName={commercialProject?.attributes.project.data?.attributes.title}
            sectionTitle={commercialProject?.attributes.BlockSolutions?.text}
          />
        )}

        <ProjectCharacteristics
          projectCharacteristics={commercialProject?.attributes.BlockSlider}
        />

        <IntroductoryTextWithVideo
          introductoryHandler={() => setIsOpenPresentation(true)}
          introductory={commercialProject?.attributes.BlockPromo}
        />

        {isOpenPresentation && (
          <ModalPresentation
            link={commercialProject?.attributes.BlockPromo.button.link}
            closeModal={() => setIsOpenPresentation(false)}
          />
        )}

        <InfrastructureMap
          project={commercialProject?.attributes.project}
          pointTypes={pointTypes}
        />

        <AdvantagesProject
          slider={commercialProject?.attributes.BlockAdvantages.slider}
          title={commercialProject?.attributes.BlockAdvantages.title}
          backgroundImage={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${commercialProject?.attributes?.BlockAdvantages?.slider[0]?.img?.data?.attributes?.url}`}
        />

        <ConstructionProgress constructionProgress={commercialProject?.attributes.BlockProgress} />

        <Investments
          investments={commercialProject?.attributes.BlockInvestment}
          openPropertyService={openPropertyService}
        />

        <Form.PageType
          formType={EFormPageType.SALES}
          formData={commercialProject?.attributes.BlockForm}
        />

        {/*  <Recommendations
          recProjects={commercialProject?.attributes.BlockRecProjects}
        />*/}
      </MainLayout>
    </>
  )
}

export default CommercialDetails

export const getStaticPaths: GetStaticPaths = async () => {
  const commercialProjectsData: any = await getCommercialProjects()

  const paths = commercialProjectsData.data.map((path: any) => {
    return { params: { id: path.attributes.slug } }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetServerSideProps = async (context) => {
  const commonData: ICommonResponse = await getCommon()
  const commercialProjectData: ICommercialProjectData = await getCommercialProject(
    String(context.params?.id),
    [{ param: '[slug]', val: String(context.params?.id) }],
    'populate[BlockMain][populate][Slider][populate][img]=url&' +
      'populate[project][populate][img]=url&' +
      'populate[project][populate][pinImg]=url&' +
      'populate[project][populate][masterPlanImg]=url&' +
      'populate[project][populate][metro]=station&populate[project][populate][geo]=lat&' +
      'populate[project][populate][pstatus][populate][img]=url&' +
      'populate[project][populate][features][populate][img]=url&' +
      'populate[project][populate][pois][populate][geo]=lat&' +
      'populate[project][populate][pois][populate][poi_type][populate][img]=url&' +
      'populate[BlockSlider][populate][img]=url&populate[BlockPromo][populate][button]=title&' +
      'populate[BlockForm][populate][metro]=station&populate[BlockProgress][populate][progress][populate][img]=url&' +
      'populate[BlockAdvantages][populate][slider][populate][img]=url&' +
      'populate[BlockInvestment][populate][forMe][populate][col][populate][img]=url&' +
      'populate[BlockInvestment][populate][forInvestment][populate][col][populate][col][populate][img]=url&' +
      'populate[BlockRecProjects][populate][recProjects][populate][img]=url&' +
      'populate[BlockSolutions]=text'
  ).then((response) => {
    return response.data[0]
  })
  const propertyService: IPropertyServiceResponse = await getPropertyService()
  const pointTypes: IPointTypesResponse = await getPointTypes()
  return {
    props: {
      common: commonData,
      commercialProject: commercialProjectData,
      propertyService,
      pointTypes,
    },
    revalidate: 120,
  }
}
