import React, { useState } from 'react'
import { C_LoginModal } from '../C_LoginModal'
import classes from './style.module.scss'
import Modal from 'react-modal'
import { Dispatch, SetStateAction } from 'react'
import { C_RegistrationModal } from '../C_RegistrationModal'
import { C_CodeModal } from '../C_CodeModal'
import classNames from 'classnames'

export const C_AuthModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
  function closeModal(): void {
    setIsOpen(false)
  }

  const [isToken, setIsToken] = useState<boolean>(false)
  const [isCode, setIsCode] = useState<boolean>(false)
  const [isRegistration, setIsRegistration] = useState<boolean>(false)
  const [phoneNumber, setPhoneNumber] = useState<string>('')

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={closeModal}
      portalClassName={classNames(classes.modal, {
        [classes.modalOpened]: isOpen,
      })}
      overlayClassName={classes.overlay}
      className={classes.content}
      overlayElement={(props, contentElement) => (
        <div {...props}>
          <div className={classes.contentWrapper}>{contentElement}</div>
        </div>
      )}
      bodyOpenClassName={classes.disableScroll}>
      {!isToken && !isRegistration && !isCode ? (
        <C_LoginModal
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          setIsCode={setIsCode}
          setIsOpen={setIsOpen}
          setIsRegistration={setIsRegistration}
        />
      ) : !isToken && isRegistration && !isCode ? (
        <C_RegistrationModal
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          setIsOpen={setIsOpen}
          setIsCode={setIsCode}
          setIsRegistration={setIsRegistration}
        />
      ) : (!isToken && isRegistration && isCode) || (!isToken && !isRegistration && isCode) ? (
        <C_CodeModal
          phoneNumber={phoneNumber}
          isRegistration={isRegistration}
          setIsRegistration={setIsRegistration}
          setIsOpen={setIsOpen}
          setIsToken={setIsToken}
          setIsCode={setIsCode}
        />
      ) : null}
    </Modal>
  )
}
