import styles from './ModalPresentantion.module.scss'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from 'shared/uikit/Icon'

export const ModalPresentation = ({
  closeModal,
  link,
}: {
  closeModal: () => void
  link: string
}) => {
  const [isMounting, setIsMounting] = useState(false)

  useEffect(() => {
    setIsMounting(true)
  }, [])
  if (isMounting && document.getElementById('mainLayout')) {
    return createPortal(
      <div className={styles.modal} onClick={closeModal}>
        <div
          className={styles.modalContent}
          onClick={(e) => {
            e.stopPropagation()
          }}>
          <iframe
            className={styles.desktopContent}
            src={link}
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen></iframe>
        </div>

        <div className={styles.tabletContent}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <Icon name="logotypeBlack" />
            </div>
            <div className={styles.close} onClick={closeModal}>
              <Icon s="24" name="close" />
            </div>
          </div>
          <div>
            <div className={styles.contentWrap}>
              <iframe
                src={link}
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </div>,
      // @ts-ignore
      document.getElementById('mainLayout')
    )
  }
  return <></>
}
