import FormModal, { EFormType } from './FormModal/FormModal'
import { ICommercialProjectBlockForm } from 'shared/lib/pageData/commercialProject/commercialProject.interface'
import { useEffect } from 'react'
import { EFormPageType, FormPage } from './FormPage/FormPage'
import { IBlockForm } from 'shared/lib/pageData/investments/investments.interface'

interface FormModalProps {
  isOpen: boolean
  formType: EFormType
  purchaseMessage?: string | undefined
  emitIsOpen: (isOpen: boolean) => void
  emitSubmit: (
    form: { phone: string; name: string } | { email: string; name: string },
    isOpenSuccessModal: boolean
  ) => void
}

interface FormPageProps {
  formData: IBlockForm | ICommercialProjectBlockForm | any
  formType: EFormPageType
}

const Form = ({ children }: { children: React.ReactNode }) => {
  return <form>{children}</form>
}

const FormItemModal = (props: FormModalProps) => {
  const { isOpen, emitIsOpen, emitSubmit, formType, purchaseMessage } = props

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
  }, [isOpen])

  return (
    <FormModal
      formType={formType}
      isOpen={isOpen}
      purchaseMessage={purchaseMessage}
      emitIsOpen={emitIsOpen}
      emitSubmit={emitSubmit}
    />
  )
}

const FormItemPage = (props: FormPageProps) => {
  const { formData, formType } = props

  return <FormPage formData={formData} formType={formType} />
}

const FormNamespace = Object.assign(Form, {
  ModalType: FormItemModal,
  PageType: FormItemPage,
})

export { FormNamespace as Form }
