import React, { FC, useEffect, useState } from 'react'
import classes from 'shared/components/CallbackButton/CallbackButton.module.scss'
import { Icon } from 'shared/uikit/Icon'
import Link from 'next/link'
import { useGenerateClasses } from 'shared/hooks/useGenerateClasses'
import { IBlockContactUs } from 'shared/services/pageData/common/common.interface'

interface ICallbackButtonProps {
  links: IBlockContactUs
  modifierClassesStyle?: string[]
  openCallbackModal: () => void
}

const CallbackButton: FC<ICallbackButtonProps> = ({
  links,
  openCallbackModal,
  modifierClassesStyle = [''],
}) => {
  /*  console.log(data)*/
  const CallbackButtonClasses: string = useGenerateClasses(classes, modifierClassesStyle)
  const [isOpenWidget, setIsOpenWidget] = useState<boolean>(false)

  useEffect(() => {
    if (isOpenWidget) {
      const headerPhone = document.getElementById('header_phone') as HTMLAnchorElement
      const widgetPhoneElement = document.getElementById('callback_btn_phone') as HTMLAnchorElement

      if (headerPhone && widgetPhoneElement) {
        widgetPhoneElement.href = headerPhone.href
        widgetPhoneElement.textContent = headerPhone.textContent
      }
    }
  }, [isOpenWidget])

  return (
    <div className={`${classes.widget} ${CallbackButtonClasses}`}>
      {isOpenWidget && (
        <div className={classes.widget__list}>
          <div className={classes.widget__item}>
            <div className={classes.button} onClick={openCallbackModal}>
              <div className={classes.button__icon}>
                <Icon s="24" name="callback" />
              </div>

              <div className={classes.button__value}>Обратный звонок</div>

              <div className={classes.button__arrow}>
                <Icon s="24" name="arrowRight" />
              </div>
            </div>
          </div>

          <Link href={links.WhatsappLink.link} target={'_blank'} className={classes.widget__item}>
            <div className={classes.button}>
              <div className={classes.button__icon}>
                <Icon s="24" name="whatsapp" />
              </div>

              <div className={classes.button__value}>WhatsApp</div>

              <div className={classes.button__arrow}>
                <Icon s="24" name="arrowRight" />
              </div>
            </div>
          </Link>

          <Link href={links.TelegramLink.link} className={classes.widget__item}>
            <div className={classes.button}>
              <div className={classes.button__icon}>
                <Icon s="24" name="telegram" />
              </div>

              <div className={classes.button__value}>Telegram</div>

              <div className={classes.button__arrow}>
                <Icon s="24" name="arrowRight" />
              </div>
            </div>
          </Link>

          <div className={classes.widget__item}>
            <Link
              className={classes.widget__phone}
              id={'callback_btn_phone'}
              href={links.PhoneLink.link}>
              {links.PhoneLink.text}
            </Link>
            <div className={classes.button}>
              <div className={classes.button__icon}>
                <Icon s="24" name="phone" />
              </div>

              <div className={classes.button__value}>Позвонить</div>

              <div className={classes.button__arrow}>
                <Icon s="24" name="arrowRight" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        onClick={() => setIsOpenWidget(!isOpenWidget)}
        className={`${classes.widget__btn} ${classes.toggleButton}`}>
        <div className={classes.toggleButton__icon}>
          {isOpenWidget && <Icon s="24" name="close" />}
          {!isOpenWidget && <Icon s="24" name="phone" />}
        </div>
      </div>
    </div>
  )
}

export default CallbackButton
