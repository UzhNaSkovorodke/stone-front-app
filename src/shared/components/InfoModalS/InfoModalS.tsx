import React, { FC } from 'react'
import classes from 'shared/components/InfoModalS/InfoModalS.module.scss'
import { Button } from 'shared/uikit/Button'
import ModalS from 'shared/components/ModalS/ModalS'
import { useRouter } from 'next/router'
import { Icon } from 'shared/uikit/Icon'

export enum EModalVariant {
  REQUEST_ACCEPTED = 'request-accepted',
  EMAIL_CONFIRMED = 'email-confirmed',
  SUBSCRIBE_NEWS = 'subscribe-news',
  SUBSCRIBE_NEWS_SUCCESS = 'subscribe-news-success',
  UNSUBSCRIBED_EMAIL = 'unsubscribed-email',
  NOT_SUBSCRIBED = 'not-subscribed',
}

interface IInfoModalSProps {
  isOpen: boolean
  variant: EModalVariant
  email: string
  emitIsOpen: (isOpen: boolean) => void
}

const InfoModalS: FC<IInfoModalSProps> = ({ isOpen, variant, email, emitIsOpen }) => {
  const router = useRouter()
  const needRedirectToMain: boolean =
    variant === EModalVariant.EMAIL_CONFIRMED ||
    variant === EModalVariant.UNSUBSCRIBED_EMAIL ||
    variant === EModalVariant.NOT_SUBSCRIBED

  const onClickButton = (): void => {
    emitIsOpen(false)
    if (needRedirectToMain) router.push('/')
  }

  return (
    <ModalS
      isOpen={isOpen}
      emitIsOpen={(isOpen) => emitIsOpen(isOpen)}
      modifierClassesStyle={['modal_height_s', 'modal_contentSpaceT_none']}>
      <div className={classes.modal}>
        {variant === EModalVariant.REQUEST_ACCEPTED && (
          <div className={classes.modal__icon}>
            <Icon name="check2" />
          </div>
        )}
        {variant === EModalVariant.EMAIL_CONFIRMED && (
          <div className={classes.modal__icon}>
            <Icon name="check2" />
          </div>
        )}
        {variant === EModalVariant.SUBSCRIBE_NEWS && (
          <div className={`${classes.modal__icon} ${classes.modal__icon_style_info}`}>
            <Icon name="check2" />
          </div>
        )}
        {variant === EModalVariant.SUBSCRIBE_NEWS_SUCCESS && (
          <div className={classes.modal__icon}>
            <Icon name="check2" />
          </div>
        )}
        {variant === EModalVariant.UNSUBSCRIBED_EMAIL && (
          <div className={classes.modal__icon}>
            <Icon name="check2" />
          </div>
        )}
        {variant === EModalVariant.NOT_SUBSCRIBED && (
          <div className={classes.modal__icon}>
            <Icon name="check2" />
          </div>
        )}

        {variant === EModalVariant.REQUEST_ACCEPTED && (
          <div className={classes.modal__title}>Запрос принят</div>
        )}
        {variant === EModalVariant.EMAIL_CONFIRMED && (
          <div className={classes.modal__title}>Ваш e-mail подтвержден!</div>
        )}
        {variant === EModalVariant.SUBSCRIBE_NEWS && (
          <div className={classes.modal__title}>Подписка на новости</div>
        )}
        {variant === EModalVariant.SUBSCRIBE_NEWS_SUCCESS && (
          <div className={classes.modal__title}>
            Спасибо за подписку <br /> на новости!
          </div>
        )}
        {variant === EModalVariant.UNSUBSCRIBED_EMAIL && (
          <div className={classes.modal__title}>Вы отписаны от рассылки</div>
        )}

        {variant === EModalVariant.EMAIL_CONFIRMED && (
          <div className={classes.modal__subtitle}>
            Благодарим за подтверждение адреса электронной&nbsp;почты <span>{email}</span>!
          </div>
        )}
        {variant === EModalVariant.UNSUBSCRIBED_EMAIL && (
          <div className={classes.modal__subtitle}>Благодарим за обратную связь!</div>
        )}
        {variant === EModalVariant.NOT_SUBSCRIBED && (
          <div className={classes.modal__subtitle}>
            Адрес электронной почты <span>{email}</span> уже исключен из рассылки новостей
          </div>
        )}

        {variant === EModalVariant.REQUEST_ACCEPTED && (
          <div className={classes.modal__description}>
            Наш менеджер свяжется <br /> с вами в ближайшее время
          </div>
        )}
        {variant === EModalVariant.EMAIL_CONFIRMED && (
          <div className={`${classes.modal__description} ${classes.modal__description_size_s}`}>
            Вы включены в рассылку новостей от Stone
          </div>
        )}
        {variant === EModalVariant.SUBSCRIBE_NEWS && (
          <div className={classes.modal__description}>
            Адрес электронной почты <span>{email}</span> уже включен в рассылку новостей
          </div>
        )}
        {variant === EModalVariant.SUBSCRIBE_NEWS_SUCCESS && (
          <div className={classes.modal__description}>
            Проверьте ваш e-mail, указанный при регистрации, мы уже отправили вам первое письмо!
          </div>
        )}
        {variant === EModalVariant.UNSUBSCRIBED_EMAIL && (
          <div className={`${classes.modal__description} ${classes.modal__description_size_s}`}>
            Сожалеем, что вы решили отписаться от информационной рассылки! Вы сможете возобновить
            подписку на новости на нашем сайта в любое время
          </div>
        )}

        <Button onClick={onClickButton} s="large" variant="blackFill">
          Хорошо
        </Button>
      </div>
    </ModalS>
  )
}

export default InfoModalS
