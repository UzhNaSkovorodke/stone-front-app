import { GetStaticProps, NextPage } from 'next'
import CatalogOfficePage from '../../../features/catalogOffice/pages/CatalogOfficePage'
import { ICommonResponse } from 'src/shared/services/pageData/common/common.interface'
import { getCommon } from 'src/shared/services/pageData/common/common'
import HeadSeo from 'src/features/headSeo/HeadSeo'

export interface PageProps {
  common: ICommonResponse
}

const Page: NextPage<PageProps> = ({ common }) => {
  return (
    <>
      <HeadSeo />
      <CatalogOfficePage common={common} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const common = await getCommon()

  return {
    props: {
      common,
    },
    revalidate: 120,
  }
}

export default Page
