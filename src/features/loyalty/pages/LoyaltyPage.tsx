import { FC } from 'react'
import { MainLayout } from 'src/layouts/MainLayout'
import { Form } from 'shared/components/Form/Form'
import { EFormPageType } from 'shared/components/Form/FormPage/FormPage'
import { ICommonResponse } from 'shared/services/pageData/common/common.interface'
import { BlockIntroductory } from 'src/features/loyalty/components/BlockIntroductory'
import { BlockPersonal } from 'src/features/loyalty/components/BlockPersonal'
import { BlockReferral } from 'src/features/loyalty/components/BlockReferral'
import { ILoyaltyResponse } from 'shared/services/pageData/loyalty/loyalty.interface'
import s from './Loyalty.module.scss'

interface LoyaltyPageProps {
  common: ICommonResponse
  commonLoyaltyData: ILoyaltyResponse
}

export const LoyaltyPage: FC<LoyaltyPageProps> = ({ common, commonLoyaltyData }) => {
  return (
    <MainLayout common={common.data?.attributes}>
      <div className={s.body}>
        <BlockIntroductory blockIntroductory={commonLoyaltyData.data.attributes.BlockIntro} />
        <BlockPersonal blockPersonal={commonLoyaltyData.data.attributes.BlockPerson} />
        <BlockReferral blockReferral={commonLoyaltyData.data.attributes.BlockReferral} />
        <Form.PageType
          formType={EFormPageType.LOYALTY}
          formData={commonLoyaltyData.data.attributes.BlockForm}
        />
      </div>
    </MainLayout>
  )
}
