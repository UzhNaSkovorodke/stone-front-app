import { EFormType, EModalVariant, IFormToEmit } from '../types/formType'
import {
  emailConfirm,
  emailSubscribe,
  emailUnsubscribe,
  EMessageEmailResponse,
  EStatusEmailSubscribe,
  IEmailUnsubscribeRequest,
} from '../services/email'
import { useState } from 'react'

export const useLayoutModal = (isOpenCallbackModal: boolean) => {
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState<boolean>(false)
  const [isFeedbackModalSOpen, setIsFeedbackModalSOpen] = useState<boolean>(false)
  const [isCallbackModalSOpen, setIsCallbackModalSOpen] = useState<boolean>(isOpenCallbackModal)
  const [isPropertyModalsOpen, setIsPropertyModalsOpen] = useState<boolean>(false)
  const [isUnsubscribeModalOpen, setIsUnsubscribeModalOpen] = useState<boolean>(false)

  const [callbackModalType, setCallbackModalType] = useState<EFormType>(EFormType.CALLBACK)
  const [activeFeedbackModalType, setActiveFeedbackModalType] = useState<EModalVariant>(
    EModalVariant.SUBSCRIBE_NEWS_SUCCESS
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [email, setEmail] = useState<string>('')
  const [hash, setHash] = useState<string | string[]>('')

  const subscribeEmail = async (form: { email: string; name: string }): Promise<void> => {
    const { status, message } = await emailSubscribe(form.email)

    setIsLoading(false)
    setIsSubscribeModalOpen(false)

    if (status === EStatusEmailSubscribe.SUCCESS && message === EMessageEmailResponse.CREATED) {
      openFeedbackModal(EModalVariant.SUBSCRIBE_NEWS_SUCCESS, form.email)
    }

    if (
      status === EStatusEmailSubscribe.SUCCESS &&
      message === EMessageEmailResponse.ALREADY_SUBSCRIBED
    ) {
      openFeedbackModal(EModalVariant.SUBSCRIBE_NEWS, form.email)
    }
  }

  const confirmEmail = async (hash: string | string[]): Promise<void> => {
    const { message, status, data } = await emailConfirm(hash as string)

    if (
      (message === EMessageEmailResponse.CONFIRMED ||
        message === EMessageEmailResponse.ALREADY_CONFIRMED) &&
      status === EStatusEmailSubscribe.SUCCESS
    ) {
      openFeedbackModal(EModalVariant.EMAIL_CONFIRMED, data.email || '')
    }
  }

  const unsubscribeEmail = async (form: IFormToEmit): Promise<void> => {
    const params: IEmailUnsubscribeRequest = {
      hash: hash as string,
      unsubscribe_reason: form.reason,
    }

    if (form.message) {
      params.message = form.message
    }

    const { message, status } = await emailUnsubscribe(params)

    setIsLoading(false)
    setIsUnsubscribeModalOpen(false)

    if (
      message === EMessageEmailResponse.UNSUBSCRIBE_SUCCESS &&
      status === EStatusEmailSubscribe.SUCCESS
    ) {
      openFeedbackModal(EModalVariant.UNSUBSCRIBED_EMAIL)
    }

    if (
      message === EMessageEmailResponse.NOT_SUBSCRIBED &&
      status === EStatusEmailSubscribe.SUCCESS
    ) {
      openFeedbackModal(EModalVariant.NOT_SUBSCRIBED)
    }
  }

  const openFeedbackModal = (variant: EModalVariant, email?: string): void => {
    if (email) setEmail(email)
    setActiveFeedbackModalType(variant)
    setIsFeedbackModalSOpen(true)
  }

  const openUnsubscribeModal = (): void => {
    setIsUnsubscribeModalOpen(true)
  }

  const closeUnsubscribeModal = (): void => {
    setIsUnsubscribeModalOpen(false)
  }

  const openSubscribeModal = (): void => {
    setIsSubscribeModalOpen(true)
  }

  const closeSubscribeModal = (): void => {
    setIsSubscribeModalOpen(false)
  }

  return {
    modal: {
      state: {
        isCallbackModalSOpen,
        isSubscribeModalOpen,
        isUnsubscribeModalOpen,
        isFeedbackModalSOpen,
        activeFeedbackModalType,
        callbackModalType,
        isPropertyModalsOpen,
      },
      action: {
        openFeedbackModal,
        openUnsubscribeModal,
        openSubscribeModal,
        closeUnsubscribeModal,
        closeSubscribeModal,
        setIsCallbackModalSOpen,
        setIsPropertyModalsOpen,
        setIsFeedbackModalSOpen,
        setActiveFeedbackModalType,
        setCallbackModalType,
      },
    },
    email: {
      state: { email },
      action: { setEmail, subscribeEmail, confirmEmail, unsubscribeEmail },
    },
    hash: {
      state: { hash },
      action: { setHash },
    },
    loading: {
      state: { isLoading },
      action: { setIsLoading },
    },
  }
}
