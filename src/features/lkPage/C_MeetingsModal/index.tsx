import classNames from 'classnames'
import classes from './style.module.scss'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Modal from 'react-modal'
import { Calendar } from 'src/shared/components/Calendar'
import { fakeDb } from 'shared/components/Calendar/db'
import { Button } from 'shared/uikit/Button'
import { TabButton } from 'shared/uikit/TabButton'
import { NextRouter, useRouter } from 'next/router'
import { Icon } from 'shared/uikit/Icon'

export default function C_MeetingsModal({
  isModal,
  isSubmit,
  setIsModal,
  setIsSubmit,
  setActiveMenu,
}: {
  isSubmit: boolean
  isModal: boolean
  setIsModal: Dispatch<SetStateAction<boolean>>
  setIsSubmit: Dispatch<SetStateAction<boolean>>
  setActiveMenu: Dispatch<SetStateAction<string>>
}) {
  const [isRadio, setIsRadio] = useState<string>('Офис')
  const [selectedDate, setSelectedDay] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>('')

  function closeModal(): void {
    setIsModal(false)
  }

  useEffect(() => {
    console.log()
  }, [isSubmit])

  const router: NextRouter = useRouter()

  const onSubmit = async () => {
    const data = {
      format: isRadio,
      date: selectedDate,
      time: selectedTime,
    }
    console.log('Форма отправлена: ', data)
  }

  return (
    <div>
      {!isSubmit ? (
        <Modal
          id="meet-modal"
          ariaHideApp={false}
          isOpen={isModal}
          onRequestClose={closeModal}
          portalClassName={classNames(classes.modal, {
            [classes.showModal]: isModal,
          })}
          parentSelector={() => document.querySelector('#wrap') as HTMLDivElement}
          overlayClassName={classes.overlay}
          className={classes.modalContent}>
          <form className={classes.meetWrapper} onSubmit={() => onSubmit}>
            <div className={classes.logoBlack}>
              <Icon name="logotypeBlack" />
            </div>
            <div className={classes.closeBtn} onClick={() => setIsModal(false)}></div>
            <h3>Запись на встречу</h3>
            <div className={classes.radioWrapper}>
              <TabButton
                type="radio"
                variant="2"
                name="radio-group"
                text="Онлайн"
                width="full"
                height="auto"
                size="medium"
                onChange={() => setIsRadio('Онлайн')}
                checked={isRadio === 'Онлайн' ? true : false}></TabButton>
              <TabButton
                type="radio"
                variant="2"
                name="radio-group"
                text="Офис"
                width="full"
                height="auto"
                size="medium"
                onChange={() => setIsRadio('Офис')}
                checked={isRadio === 'Офис' ? true : false}></TabButton>
            </div>
            <Calendar
              calendarData={fakeDb}
              selectedDate={selectedDate}
              setSelectedDay={setSelectedDay}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
            {selectedTime.length === 0 ? (
              <p className={classes.errorTime}>Выберите время встречи</p>
            ) : null}
            <p className={classes.adrress}>
              {isRadio === 'Онлайн' ? null : `Бумажный проезд, вл. 19, стр. 1`}
            </p>
            <div className={classes.submitBtn} onClick={() => (setIsSubmit(true), onSubmit())}>
              <Button
                width="full"
                variant="blackFill"
                s="large"
                disabled={selectedTime.length === 0 ? true : false}>
                Записаться на встречу
              </Button>
            </div>
          </form>
        </Modal>
      ) : (
        <Modal
          ariaHideApp={false}
          isOpen={isModal}
          onRequestClose={closeModal}
          portalClassName={classNames(classes.modal, {
            [classes.showModal]: isModal,
          })}
          overlayClassName={classes.overlay}
          parentSelector={() => document.querySelector('#wrap') as HTMLDivElement}
          className={classNames(classes.modalContent, {
            [classes.modalContentSuccess]: isSubmit,
          })}>
          <div className={classes.successWrapper}>
            <div className={classes.logoBlack}>
              <Icon name="logotypeBlack" />
            </div>
            <div className={classes.closeBtn} onClick={() => setIsModal(false)}></div>
            <div className={classes.svgWrapper}>
              <Icon name="success" />
            </div>
            <h3>Ваш запрос принят!</h3>
            <p>
              Менеджер свяжется с вами в ближайшее
              <br />
              время для подтверждения
            </p>
            <div onClick={() => (setIsModal(false), setActiveMenu('Мои встречи'))}>
              <Button variant="blackFill" width="full" onClick={() => router.push('/lk/meetings')}>
                Мои встречи
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
