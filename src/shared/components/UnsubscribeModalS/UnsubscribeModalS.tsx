import React, { FC, useState, useEffect } from 'react'
import classes from 'shared/components/UnsubscribeModalS/UnsubscribeModalS.module.scss'
import { Button } from 'shared/uikit/Button'
import ModalS from 'shared/components/ModalS/ModalS'
import Checkbox from 'shared/uikit/Checkbox/Checkbox'

export interface IFormToEmit {
  reason: number[]
  message?: string
}

interface IUnsubscribeModalSProps {
  isOpen: boolean
  isLoading: boolean
  email?: string
  emitIsOpen: (isOpen: boolean) => void
  emitSubmit: (form: IFormToEmit, isOpenSuccessModal: boolean) => void
}

const UnsubscribeModalS: FC<IUnsubscribeModalSProps> = ({
  isOpen,
  isLoading,
  email,
  emitIsOpen,
  emitSubmit,
}) => {
  const [checkbox1Value, setCheckbox1Value] = useState<boolean | null>(null)
  const [checkbox2Value, setCheckbox2Value] = useState<boolean | null>(null)
  const [checkbox3Value, setCheckbox3Value] = useState<boolean | null>(null)
  const [checkbox4Value, setCheckbox4Value] = useState<boolean | null>(null)
  const [textareaValue, setTextareaValue] = useState<string | undefined>(undefined)

  const [validationMessage, setValidationMessage] = useState<string | null>(null)

  const submit = (): void => {
    if (checkbox4Value && (textareaValue === undefined || textareaValue?.length === 0)) {
      setValidationMessage('Пожалуйста, опишите причину')
      return
    }

    if (!checkbox1Value && !checkbox2Value && !checkbox3Value && !checkbox4Value) {
      setValidationMessage('Пожалуйста, выберите причину отписки')
      return
    }

    setValidationMessage('')

    const formToEmit: IFormToEmit = {} as IFormToEmit

    if (checkbox1Value)
      Object.assign(
        formToEmit,
        formToEmit.reason ? { reason: [...formToEmit.reason, 1] } : { reason: [1] }
      )
    if (checkbox2Value)
      Object.assign(
        formToEmit,
        formToEmit.reason ? { reason: [...formToEmit.reason, 2] } : { reason: [2] }
      )
    if (checkbox3Value)
      Object.assign(
        formToEmit,
        formToEmit.reason ? { reason: [...formToEmit.reason, 3] } : { reason: [3] }
      )
    if (checkbox4Value)
      Object.assign(
        formToEmit,
        formToEmit.reason ? { reason: [...formToEmit.reason, 4] } : { reason: [4] }
      )
    if (textareaValue && textareaValue.length > 0)
      Object.assign(formToEmit, { message: textareaValue })

    emitSubmit(formToEmit, true)
  }

  useEffect(() => {
    // Убираем сообщение о валидации, если пользователь взаимодействует с формой
    if (checkbox1Value && !checkbox2Value && !checkbox3Value && !checkbox4Value)
      setValidationMessage('')
    if (!checkbox1Value && checkbox2Value && !checkbox3Value && !checkbox4Value)
      setValidationMessage('')
    if (!checkbox1Value && !checkbox2Value && checkbox3Value && !checkbox4Value)
      setValidationMessage('')
    if (!checkbox1Value && !checkbox2Value && !checkbox3Value && checkbox4Value)
      setValidationMessage('')
    if (!checkbox1Value && !checkbox2Value && !checkbox3Value && !checkbox4Value)
      setValidationMessage('')
  }, [checkbox1Value, checkbox2Value, checkbox3Value, checkbox4Value])

  if (isOpen) {
    return (
      <ModalS
        isOpen={isOpen}
        emitIsOpen={(isOpen) => emitIsOpen(isOpen)}
        modifierClassesStyle={['modal_height_l']}>
        <div className={classes.modalContent}>
          <div className={classes.modalContent__title}>Исключение из рассылки</div>

          <div className={classes.modalContent__description}>
            Мы получили ваш запрос на исключение <span>{email}</span> из информационной рассылки
          </div>

          <div className={classes.modalContent__note}>
            Пожалуйста, поделитесь почему вы хотели бы отписаться от новостей и информации по
            сделкам?
          </div>

          <div className={classes.modalContent__checkbox}>
            <Checkbox
              modifierClassesStyle={['checkbox_style_black']}
              isChecked={checkbox1Value}
              emitIsChecked={(isChecked) => setCheckbox1Value(isChecked)}>
              <span className={classes.checkboxValue}>Не интересуюсь покупкой недвижимости</span>
            </Checkbox>
          </div>

          <div className={classes.modalContent__checkbox}>
            <div className={classes.inputGroup}>
              <Checkbox
                modifierClassesStyle={['checkbox_style_black']}
                isChecked={checkbox2Value}
                emitIsChecked={(isChecked) => setCheckbox2Value(isChecked)}>
                <span className={classes.checkboxValue}>Получаю слишком много писем от Stone</span>
              </Checkbox>
            </div>
          </div>

          <div className={classes.modalContent__checkbox}>
            <Checkbox
              modifierClassesStyle={['checkbox_style_black']}
              isChecked={checkbox3Value}
              emitIsChecked={(isChecked) => setCheckbox3Value(isChecked)}>
              <span className={classes.checkboxValue}>Не подписывался на рассылку</span>
            </Checkbox>
          </div>

          <div className={classes.modalContent__checkbox}>
            <div className={classes.inputGroup}>
              <Checkbox
                modifierClassesStyle={['checkbox_style_black']}
                isChecked={checkbox4Value}
                emitIsChecked={(isChecked) => setCheckbox4Value(isChecked)}>
                <span className={classes.checkboxValue}>Другое:</span>
              </Checkbox>

              {!checkbox4Value && (
                <div
                  className={`${classes.inputGroup__message} ${
                    validationMessage ? classes.isDisplay : ''
                  } ${classes.inputGroup__message_inline}`}>
                  {validationMessage}
                </div>
              )}
            </div>
          </div>

          {checkbox4Value && (
            <div className={classes.modalContent__textarea}>
              <div className={classes.inputGroup}>
                <textarea
                  placeholder="Опишите причину"
                  value={textareaValue}
                  onChange={(event) => setTextareaValue(event.target.value)}></textarea>

                <div
                  className={`${classes.inputGroup__message} ${
                    validationMessage ? classes.isDisplay : ''
                  }`}>
                  {validationMessage}
                </div>
              </div>
            </div>
          )}

          <Button width="full" onClick={submit} s="large" variant="blackFill" isLoading={isLoading}>
            Отписаться от рассылки
          </Button>
        </div>
      </ModalS>
    )
  }

  return <></>
}

export default UnsubscribeModalS
