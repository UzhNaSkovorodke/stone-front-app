import { FC } from 'react'
import { MainLayout } from 'src/layouts/MainLayout'

import { ICommonResponse } from 'src/shared/services/pageData/common/common.interface'
import { getCommon } from 'src/shared/services/pageData/common/common'

import { Opportunities } from 'src/features/standardsPages/Opportunities/Opportunities'
import { SolutionStandards } from 'src/features/standardsPages/SolutionStandards/SolutionStandards'
import { Comfort } from 'src/features/standardsPages/Comfort/Comfort'
import { Aesthetics } from 'src/features/standardsPages/Aesthetics/Aesthetics'
import { ETypeContent } from 'src/shared/types/typeContent.enum'
import { IStandartsResponse } from 'src/shared/services/pageData/standarts/standarts.interface'
import { getStandarts } from 'src/shared/services/pageData/standarts/standarts'
import HeadSeo from 'src/features/headSeo/HeadSeo'

export interface IStandardsOfficeProps {
  common: ICommonResponse
  standarts: IStandartsResponse
}

const StandardsOffice: FC<IStandardsOfficeProps> = ({ common, standarts }) => {
  return (
    <>
      <HeadSeo />

      <MainLayout common={common.data.attributes} activeTabHeader={'office'}>
        <SolutionStandards
          gallery={standarts.data[0]?.attributes.BlockGallery}
          typeContent={ETypeContent.OFFICE}
        />

        <Aesthetics
          aesthetics={standarts.data[0]?.attributes.BlockAdvantages}
          typeContent={ETypeContent.OFFICE}
        />

        <Comfort
          comfort={standarts.data[0]?.attributes.BlockSlider}
          backgroundImage={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}/uploads/comfortoffice_0d9f98e0f7.jpg`}
        />

        <Opportunities opportunities={standarts.data[0]?.attributes.BlockOpportunity} />
      </MainLayout>
    </>
  )
}

export default StandardsOffice

export const getStaticProps = async () => {
  const commonData: ICommonResponse = await getCommon()
  const standarts: IStandartsResponse = await getStandarts([{ param: '[slug]', val: 'office' }])
  return {
    props: {
      common: commonData,
      standarts,
    },
    revalidate: 120,
  }
}
