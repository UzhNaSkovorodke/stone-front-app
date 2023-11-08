import { FC } from 'react'
import { ICommonResponse } from 'src/shared/services/pageData/common/common.interface'
import { getCommon } from 'src/shared/services/pageData/common/common'
import { getInvestments } from 'src/shared/services/pageData/investments/investments'
import { IInvestmentsPageResponse } from 'src/shared/services/pageData/investments/investments.interface'
import HeadSeo from 'src/features/headSeo/HeadSeo'
import { IDefaultProjectData } from 'src/shared/services/pageData/default/default.interface'
import InvestmentsPage from 'src/features/investments/pages/InvestmentsPage'

export interface IInvestmentsProps {
  common: ICommonResponse
  officeProjects: Array<IDefaultProjectData>
  investments: IInvestmentsPageResponse
}

const Investments: FC<IInvestmentsProps> = ({ common, investments }) => {
  return (
    <>
      <HeadSeo title={'Инвестиции'} />
      <InvestmentsPage common={common} investments={investments} />
    </>
  )
}

export default Investments

export const getStaticProps = async () => {
  const commonData: ICommonResponse = await getCommon()
  const investmentsData: IInvestmentsPageResponse = await getInvestments({
    queryParams:
      'populate[BlockMain][populate][header]=title&populate[BlockMain][populate][cards][populate][img]=url&' +
      'populate[BlockMain][populate][BlockStrategies][populate][cards][populate][img]=url&populate[BlockPromoSug1]=title&' +
      'populate[BlockPromoSug2][populate][img]=url&populate[BlockForm][populate][img]=url&' +
      'populate[BlockAdvices][populate][tabs][populate][col][populate][img]=url&' +
      'populate[stone_projects][populate][metro]=station&populate[stone_projects][populate][pstatus]=title&' +
      'populate[stone_projects][populate][features][populate][img]=url&populate[stone_projects][populate][img]=url',
  })

  return {
    props: {
      common: commonData,
      investments: investmentsData,
    },
    revalidate: 120,
  }
}
