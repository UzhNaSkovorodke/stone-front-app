import { FC } from 'react'
import { ICommonResponse } from 'src/shared/services/pageData/common/common.interface'
import { getCommon } from 'src/shared/services/pageData/common/common'
import HeadSeo from 'src/features/headSeo/HeadSeo'
import { LoyaltyPage } from 'src/features/loyalty/pages'
import { ILoyaltyResponse } from 'src/shared/services/pageData/loyalty/loyalty.interface'
import { getLoyalty } from 'src/shared/services/pageData/loyalty/loyalty'

export interface IContactsProps {
  common: ICommonResponse
  commonLoyaltyData: ILoyaltyResponse
}

const loyalty: FC<IContactsProps> = ({ common, commonLoyaltyData }) => {
  return (
    <>
      <HeadSeo />
      <LoyaltyPage common={common} commonLoyaltyData={commonLoyaltyData} />
    </>
  )
}

export default loyalty

export const getStaticProps = async () => {
  const commonData: ICommonResponse = await getCommon()
  const commonLoyaltyData: ILoyaltyResponse = await getLoyalty({
    queryParams:
      'populate[BlockIntro]=title&populate[BlockIntro][populate][icons][populate]=title' +
      '&populate[BlockIntro][populate][icons][populate][img]=url' +
      '&populate[BlockPerson]=title&populate[BlockPerson][populate][main]=title' +
      '&populate[BlockPerson][populate][main][populate][button]=text' +
      '&populate[BlockPerson][populate][conditionals]=title' +
      '&populate[BlockPerson][populate][icons][populate][img]=url' +
      '&populate[BlockReferral][populate][img][populate][img]=url' +
      '&populate[BlockReferral][populate][headerBtn][populate][button]=link' +
      '&populate[BlockReferral][populate][headerBtn]=title' +
      '&populate[BlockReferral]=title' +
      '&populate[BlockReferral][populate][steps]=text' +
      '&populate[BlockForm][populate][img][populate][img]=url',
  })

  return {
    props: {
      common: commonData,
      commonLoyaltyData: commonLoyaltyData,
    },
    revalidate: 120,
  }
}
