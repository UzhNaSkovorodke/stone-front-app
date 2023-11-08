import { FC, useEffect, useState } from 'react'
import HeadSeo from 'src/features/headSeo/HeadSeo'
import { MainLayout } from 'src/layouts/MainLayout'
import { getCommon } from 'src/shared/services/pageData/common/common'
import { ICommonResponse } from 'src/shared/services/pageData/common/common.interface'
import { useModal } from 'src/shared/hooks/useModal'
import { EFormType } from 'src/shared/components/Form/FormModal/FormModal'
import { getPurchaseTerms } from 'src/shared/services/pageData/purchaseTerms/purchaseTerms'
import { IPurchaseTermsResponse } from 'src/shared/services/pageData/purchaseTerms/purchaseTerms.interface'
import PurchasePage from 'src/features/purchase/pages/PurchasePage'

export interface IPurchaseTermsProps {
  common: ICommonResponse
  purchaseTermsData: IPurchaseTermsResponse
}

const PurchaseTerms: FC<IPurchaseTermsProps> = ({ common, purchaseTermsData }) => {
  const callbackModal = useModal(false)
  const [modalVariation, setModalVariation] = useState<EFormType>(EFormType.CALLBACK)

  const [cardMessage, setCardMessage] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!callbackModal.isOpen) {
      setCardMessage(undefined)
    }
  }, [callbackModal.isOpen])

  return (
    <>
      <HeadSeo />

      <MainLayout
        common={common.data?.attributes}
        isOpenCallbackModal={callbackModal.isOpen}
        toggleCallbackModal={callbackModal.toggle}
        callbackModalVariation={modalVariation}
        changeCallbackModalVariation={setModalVariation}
        purchaseMessage={cardMessage}>
        <PurchasePage common={common} purchaseTermsData={purchaseTermsData} />
      </MainLayout>
    </>
  )
}

export default PurchaseTerms

export const getStaticProps = async () => {
  const commonData: ICommonResponse = await getCommon()
  const purchaseTermsData: IPurchaseTermsResponse = await getPurchaseTerms({
    queryParams:
      'populate[BlockHeader]=title' +
      '&populate[PurchaseCards][populate][characteristics]=title&populate[PurchaseCards][populate][options][populate][img]=url' +
      '&populate[PurchaseCards][populate][options]=title' +
      '&populate[PurchaseCards][populate][icon]=url',
  })

  return {
    props: {
      common: commonData,
      purchaseTermsData: purchaseTermsData,
    },
    revalidate: 120,
  }
}
