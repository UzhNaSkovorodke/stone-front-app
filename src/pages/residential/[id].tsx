import { FC } from 'react'
import { MainLayout } from 'src/layouts/MainLayout'
import { Investments } from 'src/features/residentialDetailsPage/Investments/Investments'
import { IntroductoryTextWithVideo } from 'src/shared/components/IntroductoryTextWithVideo/IntroductoryTextWithVideo'
import { AdvantagesProject } from 'src/shared/components/AdvantagesProject/AdvantagesProject'
import { ICommonResponse } from 'src/shared/services/pageData/common/common.interface'
import { getCommon } from 'src/shared/services/pageData/common/common'
import { getDomProject } from 'src/shared/services/pageData/domProject/domProject'
import { GetStaticPaths, GetStaticProps } from 'next'
import { IDomProjectData } from 'src/shared/services/pageData/domProject/domProject.interface'
import { AboutProjects } from 'src/features/residentialDetailsPage/AboutProjects/AboutProjects'
import { IPointTypesResponse } from 'src/shared/services/pageData/pointTypes/pointTypes.interface'
import { getPointTypes } from 'src/shared/services/pageData/pointTypes/pointTypes'
import InfrastructureMap from 'src/shared/components/map/InfrastructureMap'
import { ProjectCharacteristics } from 'src/shared/components/ProjectCharacteristics/ProjectCharacteristics'
import HeadSeo from 'src/features/headSeo/HeadSeo'
import { Form } from 'src/shared/components/Form/Form'
import { EFormPageType } from 'src/shared/components/Form/FormPage/FormPage'

export interface IResidentialProps {
  common: ICommonResponse
  project: IDomProjectData
  pointTypes: IPointTypesResponse
}

const ResidentialDetails: FC<IResidentialProps> = ({ common, project, pointTypes }) => {
  if (!common || !project || !pointTypes) return null
  let isSold: boolean =
    project.attributes.project.data?.attributes.pstatus.data.attributes.slug === 'prodano'
  return (
    <>
      <HeadSeo />

      <MainLayout common={common.data.attributes} activeTabHeader={'dom'}>
        <AboutProjects project={project.attributes.project} isSold={isSold} />

        <ProjectCharacteristics
          type={'dom'}
          projectCharacteristics={project.attributes.BlockSlider}
        />

        <IntroductoryTextWithVideo
          introductory={project.attributes.BlockPromo}
          isResidential={true}
          isSold={isSold}
        />

        <InfrastructureMap project={project.attributes.project} pointTypes={pointTypes} />

        <AdvantagesProject
          slider={project.attributes.BlockAdvantages.advantages}
          title={project.attributes.BlockAdvantages.title}
          backgroundImage={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${project.attributes.BlockAdvantages.advantages[0].img.data.attributes.url}`}
          modifierClassesStyle={['blockList_style_dom']}
        />

        <Investments investments={project.attributes.BlockInvestment} />

        <Form.PageType formData={project.attributes.BlockForm} formType={EFormPageType.SALES} />
      </MainLayout>
    </>
  )
}

export default ResidentialDetails

export const getStaticPaths: GetStaticPaths = async () => {
  const domProjectsData: any = await getDomProject()

  const paths = domProjectsData.data.map((path: any) => {
    return { params: { id: path.attributes.slug } }
  })
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const commonData: ICommonResponse = await getCommon()
  const projectData: IDomProjectData = await getDomProject(String(context.params?.id), [
    { param: '[project][projectUuid]', val: String(context.params?.id) },
  ]).then((response) => response.data[0])
  const pointTypes: IPointTypesResponse = await getPointTypes()

  return {
    props: {
      common: commonData,
      project: projectData,
      pointTypes,
    },
    revalidate: 120,
  }
}
