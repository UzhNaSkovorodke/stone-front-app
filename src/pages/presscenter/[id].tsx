import { NewsPage } from 'src/features/pressCenter/pages/NewsPage/NewsPage'
import { usePost } from 'src/shared/queries/usePost'
import { useRouter } from 'next/router'
import { getCommon } from 'src/shared/services/pageData/common/common'
import { ICommonResponse } from 'src/shared/services/pageData/common/common.interface'
import HeadSeo from 'src/features/headSeo/HeadSeo'

const Page = ({ common }: { common: ICommonResponse }) => {
  const router = useRouter()

  const { post } = usePost({ postId: router.query.id as string, enabled: Boolean(router.query.id) })

  if (!post) return null

  return (
    <>
      <HeadSeo title={'Пресс-центр'} />
      <NewsPage post={post} common={common} />
    </>
  )
}

export default Page

export const getServerSideProps = async () => {
  const commonData: ICommonResponse = await getCommon()

  return {
    props: {
      common: commonData,
    },
  }
}
