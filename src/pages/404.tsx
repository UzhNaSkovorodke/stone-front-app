import { FC } from 'react'
import { MainLayout } from 'src/layouts/MainLayout'
import classes from 'src/styles/pages/404.module.scss'
import { Button } from 'src/shared/uikit/Button'
import { getCommon } from 'src/shared/services/pageData/common/common'
import { ICommonResponse } from 'src/shared/services/pageData/common/common.interface'
import HeadSeo from 'src/features/headSeo/HeadSeo'
import { Icon } from 'src/shared/uikit/Icon'

export interface IPage404Props {
  common: ICommonResponse
}

const Page404: FC<IPage404Props> = ({ common }) => {
  //TODO написать редирект сюды с неправильной страницы лота

  return (
    <>
      <HeadSeo />

      <MainLayout common={common.data.attributes} isDisplayFooter={false}>
        <div className={classes.block}>
          <div className={classes.block__icon}>
            <Icon name="closeCircle" />
          </div>
          <div className={classes.block__title}>Что-то пошло не так</div>
          <div className={classes.block__description}>Та страница, что вы искали, не найдена</div>
          <Button href={'/'} s="medium" width="auto" variant="whiteFill">
            Вернуться на главную
          </Button>
        </div>
      </MainLayout>
    </>
  )
}

export default Page404

export const getStaticProps = async () => {
  const commonData: ICommonResponse = await getCommon()

  return {
    props: {
      common: commonData,
    },
    revalidate: 120,
  }
}
