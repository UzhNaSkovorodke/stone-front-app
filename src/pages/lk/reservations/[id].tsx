import { useRouter } from 'next/router'
import { GetServerSideProps, NextPage } from 'next'
import { ReservationsPage } from 'src/features/reservations/pages/ReservationsPage'

export interface PageProps {}

const Page: NextPage<PageProps> = (props) => {
  const router = useRouter()
  const { lotId } = router.query
  return <ReservationsPage />
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

export default Page
