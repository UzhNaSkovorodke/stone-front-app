import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import classes from '../Form.module.scss'
import { Button } from 'shared/uikit/Button'
import ModalS from 'shared/components/ModalS/ModalS'
import { Input } from 'shared/uikit/Input'
import Checkbox from 'shared/uikit/Checkbox/Checkbox'
import Link from 'next/link'
import InputMask from 'react-input-mask'
import useFormModal from 'shared/components/Form/FormModal/useFormModal'
import { emailReg, nameReg, phoneReg } from 'shared/components/Form/const'

interface IFormInputs {
  phone: string
  name: string
  email: string
  adCheckbox: boolean
  personalCheckbox: boolean
}

export enum EFormType {
  RESERVATION = 'RESERVATION',
  WAITING_LIST = 'WAITING_LIST',
  CALLBACK = 'CALLBACK',
  PROPERTY = 'PROPERTY',
  SUBSCRIBE = 'SUBSCRIBE',
}

interface IFormProps {
  isOpen: boolean
  formType: EFormType
  purchaseMessage?: string | undefined
  emitIsOpen: (isOpen: boolean) => void
  emitSubmit: (form: { email: string; name: string }, isOpenSuccessModal: boolean) => void
}

const FormModal: React.FC<IFormProps> = ({
  isOpen,
  formType,
  purchaseMessage,
  emitIsOpen,
  emitSubmit,
}) => {
  const {
    register,
    handleSubmit,
    control,
    trigger,
    reset,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>()

  const { getSubTitle, getModalTitle, getBtnText, getModalModifier, pullComagicTm, pullYm } =
    useFormModal(purchaseMessage)

  const onSubmit = (data: IFormInputs) => {
    emitIsOpen(false)
    data.phone ? (data.phone = data.phone.replace(/\D/g, '')) : false

    pullYm(formType)
    pullComagicTm(data, formType)

    if (formType === EFormType.SUBSCRIBE) {
      emitSubmit({ email: data.email, name: data.name }, true)
    } else {
      emitSubmit({ email: '', name: '' }, true)
    }
    reset()
  }

  const { onChange, onBlur, ...rest } = register('phone', {
    required: formType !== EFormType.SUBSCRIBE,
    pattern: { value: phoneReg, message: '' },
    onBlur: () => trigger('phone'),
  })
  return (
    <ModalS
      isOpen={isOpen}
      emitIsOpen={(isOpen) => emitIsOpen(isOpen)}
      modifierClassesStyle={getModalModifier(formType)}>
      <form className={classes.modalContent} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.title}>{getModalTitle(formType)}</div>

        <div className={classes.description}>{getSubTitle(formType)}</div>

        <div className={`${classes.input} ${classes.inputGroup}`}>
          {!(formType === EFormType.SUBSCRIBE) && (
            <label>
              <div className={classes.inputGroup__title}>Телефон</div>

              <InputMask
                inputMode="numeric"
                name="phone"
                mask={'+7 (999) 999-99-99'}
                maskPlaceholder={null}
                onChange={onChange}
                placeholder="+7 (- - -)&ensp;- - -&ensp;- -&ensp;- -"
                onBlur={onBlur}>
                <Input
                  type="tel"
                  {...rest}
                  s="large"
                  variant="blackFill"
                  {...register('phone')}
                  isError={Boolean(errors.phone)}
                />
              </InputMask>

              {errors.phone && (
                <div className={`${classes.message}`}>
                  {errors.phone?.type === 'required'
                    ? 'Пожалуйста, введите номер телефона'
                    : 'Номер телефона указан неверно'}
                </div>
              )}
            </label>
          )}

          {formType === EFormType.SUBSCRIBE && (
            <label>
              <div className={classes.inputGroup__title}>E-mail</div>
              <Input
                s="large"
                placeholder="Ваш e-mail"
                variant="blackFill"
                {...register('email', { required: true, pattern: emailReg })}
                onBlur={() => trigger('email')}
                value={watch('email') || ''}
                isError={Boolean(errors.email)}
              />

              {errors.email && (
                <div className={`${classes.message}`}>Пожалуйста, заполните e-mail</div>
              )}
            </label>
          )}
        </div>

        <div className={`${classes.input} ${classes.inputGroup}`}>
          <label>
            <div className={classes.inputGroup__title}>Имя</div>

            <Input
              s="large"
              placeholder="Введите имя"
              variant="blackFill"
              {...register('name', { required: true, pattern: nameReg })}
              onBlur={() => trigger('name')}
              value={watch('name') || ''}
              isError={Boolean(errors.name)}
            />

            {errors.name && (
              <div className={`${classes.message}`}>
                {errors.name?.type === 'required'
                  ? 'Пожалуйста, заполните имя'
                  : 'Имя указано в неверном формате'}
              </div>
            )}
          </label>
        </div>

        {!(formType === EFormType.WAITING_LIST) && (
          <div
            className={`${classes.checkbox} ${classes.inputGroup}
            ${formType === EFormType.SUBSCRIBE ? classes.checkbox_spaceB : ''}`}>
            <Controller
              control={control}
              name="adCheckbox"
              rules={formType === EFormType.SUBSCRIBE ? { required: true } : {}}
              render={({ field }) => (
                <Checkbox
                  isChecked={field.value}
                  modifierClassesStyle={['checkbox_style_black']}
                  isError={formType === EFormType.SUBSCRIBE ? Boolean(errors.adCheckbox) : false}
                  emitIsChecked={(isChecked) => {
                    field.onChange(isChecked)
                    trigger('adCheckbox')
                  }}>
                  <span className={classes.checkboxValue}>
                    Согласен(-на) получать новости, информацию по сделке и{' '}
                    <Link href="/documents/soglasie-na-rassylki" target="_blank">
                      рекламу
                    </Link>{' '}
                    от Stone
                  </span>
                </Checkbox>
              )}
            />

            {errors.adCheckbox && (
              <div className={`${classes.message}`}>Необходимо подтверждение</div>
            )}
          </div>
        )}

        {!(formType === EFormType.SUBSCRIBE) && (
          <div className={`${classes.checkbox_spaceB} ${classes.inputGroup}`}>
            <Controller
              control={control}
              rules={{ required: true }}
              name="personalCheckbox"
              render={({ field }) => (
                <Checkbox
                  modifierClassesStyle={['checkbox_style_black']}
                  isChecked={field.value}
                  isError={Boolean(errors.personalCheckbox)}
                  emitIsChecked={(isChecked) => {
                    field.onChange(isChecked)
                    trigger('personalCheckbox')
                  }}>
                  <span className={classes.checkboxValue}>
                    Я принимаю условия{' '}
                    <Link href="/documents/politika-konfidenczialnosti" target="_blank">
                      Политики обработки и защиты персональных данных
                    </Link>
                    ,{' '}
                    <Link href="/documents/docs" target="_blank">
                      даю согласие на обработку персональных данных
                    </Link>
                  </span>
                </Checkbox>
              )}
            />

            {errors.personalCheckbox && (
              <div className={`${classes.message} ${classes.message_style_checkbox}`}>
                Необходимо подтверждение
              </div>
            )}
          </div>
        )}

        <Button
          className={classes.submit_btn}
          width="full"
          type="submit"
          s="large"
          variant="blackFill">
          {getBtnText(formType)}
        </Button>
      </form>
    </ModalS>
  )
}

export default FormModal
