import { MainLayout } from 'src/layouts/MainLayout'
import PurchaseOffersList from 'src/features/purchase/components/PurchaseOffersList'
import { useModal } from 'shared/hooks/useModal'
import { FC, useEffect, useState } from 'react'
import HeaderPurchase from 'src/features/purchase/components/Header.tsx'
import { IPurchaseTermsResponse } from 'shared/services/pageData/purchaseTerms/purchaseTerms.interface'
import { ICommonResponse } from 'shared/services/pageData/common/common.interface'
import { EFormType } from 'shared/components/Form/FormModal/FormModal'

export interface IPurchasePage {
  common: ICommonResponse
  purchaseTermsData: IPurchaseTermsResponse
}

const PurchasePage: FC<IPurchasePage> = ({ common, purchaseTermsData }) => {
  const { BlockHeader, PurchaseCards } = purchaseTermsData.data.attributes

  const callbackModal = useModal(false)
  const [modalVariation, setModalVariation] = useState<EFormType>(EFormType.CALLBACK)

  const [cardMessage, setCardMessage] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!callbackModal.isOpen) {
      setCardMessage(undefined)
    }
  }, [callbackModal.isOpen])

  return (
    <MainLayout
      common={common.data?.attributes}
      isOpenCallbackModal={callbackModal.isOpen}
      toggleCallbackModal={callbackModal.toggle}
      callbackModalVariation={modalVariation}
      changeCallbackModalVariation={setModalVariation}
      purchaseMessage={cardMessage}>
      <HeaderPurchase header={BlockHeader.title} description={BlockHeader.text} />
      <PurchaseOffersList
        offers={PurchaseCards}
        toggleCallbackModal={callbackModal.toggle}
        setCardMessage={setCardMessage}
      />
    </MainLayout>
  )
}
export default PurchasePage
