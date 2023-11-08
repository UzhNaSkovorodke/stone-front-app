import { FC } from 'react'
import { MainLayout } from 'src/layouts/MainLayout'

import { ICommonResponse } from 'src/shared/services/pageData/common/common.interface'
import { getCommon } from 'src/shared/services/pageData/common/common'

import { Opportunities } from 'src/features/standardsPages/Opportunities/Opportunities'
import { SolutionStandards } from 'src/features/standardsPages/SolutionStandards/SolutionStandards'
import { Comfort } from 'src/features/standardsPages/Comfort/Comfort'
import { Aesthetics } from 'src/features/standardsPages/Aesthetics/Aesthetics'
import { getStandarts } from 'src/shared/services/pageData/standarts/standarts'
import { IStandartsResponse } from 'src/shared/services/pageData/standarts/standarts.interface'
import HeadSeo from 'src/features/headSeo/HeadSeo'

export interface IStandardsDomProps {
  common: ICommonResponse
  standarts: IStandartsResponse
}

const StandardsDom: FC<IStandardsDomProps> = ({ common, standarts }) => {
  return (
    <>
      <HeadSeo />

      <MainLayout common={common.data.attributes} activeTabHeader={'dom'}>
        <SolutionStandards gallery={standarts.data[0]?.attributes.BlockGallery} />

        <Aesthetics aesthetics={standarts.data[0]?.attributes.BlockAdvantages} />

        <Comfort
          comfort={standarts.data[0]?.attributes.BlockSlider}
          backgroundImage={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}/uploads/DSCF_1892_2_dea1540a20.jpg`}
        />

        <Opportunities opportunities={standarts.data[0]?.attributes.BlockOpportunity} />
      </MainLayout>
    </>
  )
}

export default StandardsDom

export const getStaticProps = async () => {
  const commonData: ICommonResponse = await getCommon()
  const standarts: IStandartsResponse = await getStandarts([{ param: '[slug]', val: 'dom' }])
  return {
    props: {
      common: commonData,
      standarts,
    },
    revalidate: 120,
  }
}
