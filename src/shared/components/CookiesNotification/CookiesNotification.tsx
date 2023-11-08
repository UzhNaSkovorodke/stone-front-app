import React, { FC } from 'react'
import classes from './CookiesNotification.module.scss'
import { Button } from 'shared/uikit/Button'
import { setCookie } from 'cookies-next'

interface ICookiesNotificationProps {
  setIsCookiesAccepted: (value: boolean) => void
}

export const CookiesNotification: FC<ICookiesNotificationProps> = ({ setIsCookiesAccepted }) => {
  const setCookiesAccepted = () => {
    setIsCookiesAccepted(true)
    setCookie('cookiesAccepted', true, { maxAge: 60 * 60 * 24 })
  }

  return (
    <div className={classes.block}>
      <div className={classes.block__description}>
        Продолжая просматривать этот веб-сайт, вы даете согласие на использование cookie-файлов
      </div>
      <div>
        <Button
          onClick={() => {
            setCookiesAccepted()
          }}
          s="small"
          width="auto"
          variant="blackStroke">
          Ok
        </Button>
      </div>
    </div>
  )
}
