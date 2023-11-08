import React, { FC } from 'react'
import classes from 'shared/components/ModalS/ModalS.module.scss'
import { Icon } from 'shared/uikit/Icon'
import { useGenerateClasses } from 'shared/hooks/useGenerateClasses'

interface IModalSProps {
  isOpen: boolean
  emitIsOpen: (isOpen: boolean) => void
  modifierClassesStyle?: string[]
  children?: React.ReactNode
}

const ModalS: FC<IModalSProps> = ({
  isOpen = false,
  emitIsOpen,
  modifierClassesStyle = [''],
  children,
}) => {
  const modalSModifierClasses: string = useGenerateClasses(classes, modifierClassesStyle)

  const closeModal = () => {
    emitIsOpen(false)
  }

  if (isOpen) {
    return (
      <div className={`${classes.modal} ${modalSModifierClasses}`}>
        <div onClick={closeModal} className={classes.modal__overlay}></div>

        <div className={classes.modal__body}>
          <div className={classes.modal__header}>
            <div className={classes.modal__logo}>
              <Icon name="logotypeBlack" />
            </div>
            <div className={classes.modal__close} onClick={closeModal}>
              <Icon s="24" name="close" />
            </div>
          </div>

          <div className={classes.modal__contentWrap}>
            <div className={classes.modal__content}>{children}</div>
          </div>
        </div>
      </div>
    )
  }
  return <></>
}

export default ModalS
