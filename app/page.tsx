import styles from './page.module.scss'
import { getCommon } from 'shared/lib/pageData/common/common'
import { MainLayout } from 'features/MainLayout/MainLayout'
import { ICommonResponse } from 'shared/lib/pageData/common/common.interface'

export default async function Main<IMainProps>() {
  const common: ICommonResponse = await getCommon()

  return (
    <main className={styles.main}>
      <MainLayout common={common.data.attributes}></MainLayout>
    </main>
  )
}
