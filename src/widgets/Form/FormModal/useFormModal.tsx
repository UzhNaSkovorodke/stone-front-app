import { EFormType } from 'shared/lib/types/form.interface'
import { ymTarget } from 'shared/lib/utils/ym'
import { createTicket, ITicketRequest } from 'shared/lib/utils/tickets'

declare const Comagic: any

const useFormModal = (purchaseMessage?: string | undefined) => {
  const getMessageTicket = (formType: EFormType, purchaseMessage?: string | undefined) => {
    if (purchaseMessage) return purchaseMessage

    switch (formType) {
      case EFormType.CALLBACK:
        return 'Обратный звонок'
      case EFormType.RESERVATION:
        return 'Бронирование '
      case EFormType.WAITING_LIST:
        return 'Лист ожидания'
      case EFormType.PROPERTY:
        return 'Консультация Property service'
      default:
        return 'Обратный звонок'
    }
  }
  const getSubTitle = (formType: EFormType) => {
    switch (formType) {
      case EFormType.CALLBACK:
        return 'Оставьте номер телефона для получения консультации'
      case EFormType.RESERVATION:
        return 'Оставьте номер телефона для получения консультации'
      case EFormType.WAITING_LIST:
        return 'Оставьте номер телефона для записи в лист ожидания'
      case EFormType.SUBSCRIBE:
        return 'Узнавайте первым о новостях и стартах новых проектов компании по почте'
      default:
        return 'Оставьте номер телефона для получения консультации'
    }
  }
  const getModalTitle = (formType: EFormType) => {
    switch (formType) {
      case EFormType.CALLBACK:
        return 'Обратный звонок'
      case EFormType.RESERVATION:
        return 'Запрос на бронирование'
      case EFormType.WAITING_LIST:
        return 'Запись в лист ожидания'
      case EFormType.SUBSCRIBE:
        return 'Подпишитесь на новости'
      default:
        return 'Обратный звонок'
    }
  }
  const getBtnText = (formType: EFormType) => {
    switch (formType) {
      case EFormType.RESERVATION:
        return 'Отправить запрос'
      case EFormType.SUBSCRIBE:
        return 'Подписаться на новости'
      default:
        return 'Связаться со мной'
    }
  }
  const getModalModifier = (formType: EFormType) => {
    if (formType === EFormType.SUBSCRIBE) return ['modal_height_s']
    if (formType === EFormType.WAITING_LIST) return ['modal_height_sl']
    return ['']
  }

  const pullYm = (formType: EFormType) => {
    try {
      switch (formType) {
        case EFormType.WAITING_LIST:
          ymTarget('wish_list')
          break
        case EFormType.RESERVATION:
          ymTarget('booking')
          break
        case EFormType.SUBSCRIBE:
          ymTarget('news_subscription')
          break
        case EFormType.CALLBACK:
          ymTarget('callback_from_our_widget')
          break
        case EFormType.PROPERTY:
          ymTarget('property')
          break
        default:
          ymTarget('callback_from_our_widget')
          break
      }
    } catch (e) {}
  }

  const pullComagicTm = (
    form: { phone: string; name: string; email?: string },
    formType: EFormType
  ) => {
    const ticketData: ITicketRequest = {
      phone: form.phone,
      cm_session_id: null,
      message:
        `Эта заявка отправлена с ${window.location.href} \n ` +
        `${getMessageTicket(formType, purchaseMessage)}`,
    }
    if (typeof Comagic !== 'undefined') {
      ticketData.cm_session_id =
        Comagic && Comagic.getSessionId() !== null ? Number(Comagic.getSessionId()) : null
    }
    if (formType !== EFormType.SUBSCRIBE) {
      ticketData.name = form.name
      try {
        createTicket(ticketData)
      } catch (e) {}
    }
  }

  return {
    getSubTitle,
    getModalTitle,
    getBtnText,
    getModalModifier,
    pullYm,
    pullComagicTm,
  }
}

export default useFormModal
