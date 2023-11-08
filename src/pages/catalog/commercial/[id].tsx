import { LotPage } from 'src/features/catalogOffice/pages/LotPage/LotPage'
import { GetServerSideProps, NextPage } from 'next'
import { ICommonResponse } from 'src/shared/services/pageData/common/common.interface'
import { getCommon } from 'src/shared/services/pageData/common/common'
import HeadSeo from 'src/features/headSeo/HeadSeo'
import { LotCardData } from 'src/shared/types/lotCard'
import { getLotById } from 'src/shared/services/pageData/catalogCommercial/catalogCommercial'

export interface PageProps {
  common: ICommonResponse
  data: LotCardData
}

const Page: NextPage<PageProps> = ({ common, data }) => {
  return (
    <>
      <HeadSeo />
      <LotPage lot={data} common={common} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const common = await getCommon()
  let data

  if (params) {
    data = await getLotById(params.id as string)
  }

  if (!data) {
    return {
      redirect: {
        permanent: true,
        destination: '/404',
      },
    }
  }

  return {
    props: {
      common,
      data,
    },
  }
}

export default Page
