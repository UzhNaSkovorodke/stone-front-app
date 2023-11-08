import { IndexPage } from 'src/features/pressCenter/pages/IndexPage/IndexPage'
import { getCommon } from 'src/shared/services/pageData/common/common'
import { ICommonResponse } from 'src/shared/services/pageData/common/common.interface'
import HeadSeo from 'src/features/headSeo/HeadSeo'

const Page = ({ common }: { common: ICommonResponse }) => {
  return (
    <>
      <HeadSeo title={'Пресс-центр'} />
      <IndexPage common={common} />
    </>
  )
}

export default Page

export const getStaticProps = async () => {
  const commonData: ICommonResponse = await getCommon()

  return {
    props: {
      common: commonData,
    },
    revalidate: 120,
  }
}
