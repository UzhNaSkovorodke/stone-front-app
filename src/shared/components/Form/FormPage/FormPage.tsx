import React, { FC, useState } from 'react'
import classes from './FormPage.module.scss'
import { Input } from 'shared/uikit/Input'
import { Button } from 'shared/uikit/Button'
import { MetroIcon } from 'shared/components/MetroIcon'
import Checkbox from 'shared/uikit/Checkbox/Checkbox'
import Link from 'next/link'
import ModalS from 'shared/components/ModalS/ModalS'
import { createTicket, ITicketRequest, ITicketResponse } from 'shared/services/tickets'
import { useMetro } from 'shared/hooks/useMetro'
import { Controller, useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { IBlockForm } from 'shared/services/pageData/investments/investments.interface'
import { ICommercialProjectBlockForm } from 'shared/services/pageData/commercialProject/commercialProject.interface'
import { nameReg, phoneReg } from 'shared/components/Form/const'
import { ymTarget } from 'shared/utils/ym'
import { Icon } from 'shared/uikit/Icon'

interface IFormPageProps {
  formData?: IBlockForm | ICommercialProjectBlockForm
  formType: EFormPageType
}

export enum EFormPageType {
  INVEST = 'INVEST',
  SALES = 'SALES',
  LOYALTY = 'LOYALTY',
}

interface IFormInputs {
  phone: string
  name: string
  personalCheckbox: boolean
}

declare const Comagic: any
export const FormPage: FC<IFormPageProps> = ({ formData, formType }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { getMetroColor, getMetroStationName } = useMetro()
  const isInvest = formType === 'INVEST'
  const isSales = formType === 'SALES'
  const isLoyalty = formType === 'LOYALTY'

  const messageMap = {
    INVEST: 'Консультация инвестиции',
    SALES: 'Запись на встречу',
    LOYALTY: 'Консультация Лояльность',
  }

  const ymMap = {
    INVEST: 'consultation_invest',
    SALES: 'lead_from_form',
    LOYALTY: 'consultation_loyalty',
  }
  const getMessageMetric = (target: 'comagic' | 'yandex', formType: EFormPageType) => {
    if (target === 'yandex') {
      return ymMap[formType]
    } else {
      return messageMap[formType]
    }
  }

  const sendFeedbackData = async (data: {
    phone: string
    name: string
    personalCheckbox: boolean
  }): Promise<ITicketResponse> => {
    const ticket: ITicketRequest = {
      name: data.name,
      phone: data.phone,
      cm_session_id: null,
      message:
        `Эта заявка отправлена с ${window.location.href} \n` +
        ` ${getMessageMetric('comagic', formType)}`,
    }

    if (typeof Comagic !== 'undefined') {
      ticket.cm_session_id =
        Comagic && Comagic.getSessionId() !== null ? Number(Comagic.getSessionId()) : null
    }
    return await createTicket(ticket)
  }

  const onSubmit = async (data: IFormInputs) => {
    data.phone ? (data.phone = data.phone.replace(/\D/g, '')) : false
    setIsModalOpen(true)
    const response = await sendFeedbackData(data)
    try {
      if (response.status === 'success') {
        ymTarget(getMessageMetric('yandex', formType))
        reset()
      }
    } catch (e) {}
  }

  const {
    register,
    handleSubmit,
    control,
    trigger,
    reset,
    watch,
    formState: { errors },
  } = useForm<any>()

  const backImg = formData?.img ? (formData.img.data?.attributes.url as string) : ''
  const { onChange, onBlur, ...rest } = register('phone', {
    required: true,
    pattern: { value: phoneReg, message: '' },
    onBlur: () => trigger('phone'),
  })

  if (formData)
    return (
      <div className={classes.block}>
        <div
          className={classes.block__img}
          style={
            !isSales
              ? { backgroundImage: `url('${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${backImg}')` }
              : {}
          }
        />

        <div
          className={`${classes.block__content}  ${isInvest && classes.block__content__invest} ${
            isLoyalty && classes.block__content_loyalty
          }`}>
          <div
            className={`${classes.block__title} ${
              !isSales && classes.block__title_invest_loyalty
            }`}>
            {formData.title || ''}
          </div>

          {!isSales && (
            <div
              className={`${classes.block__description} ${
                isLoyalty && classes.block__description_loyalty
              }`}>
              {('text' in formData && formData.text) || ''}
            </div>
          )}

          {isSales && (
            <>
              <div className={classes.info}>
                <div className={classes.info__title}>Адрес</div>

                <div className={classes.info__value}>
                  {('address' in formData && formData.address) || ''}
                </div>
              </div>

              <div className={`${classes.info} ${classes.info_lastChild}`}>
                <div className={classes.info__title}>Метро</div>

                <div className={classes.info__value}>
                  <div className={classes.info__icon}>
                    <MetroIcon
                      s="large"
                      variant="black"
                      color={getMetroColor(('metro' in formData && formData.metro) || '')}
                    />
                  </div>
                  {getMetroStationName(('metro' in formData && formData.metro) || '')}
                </div>
              </div>
            </>
          )}

          {isLoyalty && <div className={classes.phone}>{formData.phone}</div>}

          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <div className={classes.form__line}>
              <div className={`${classes.form__cell} ${classes.inputGroup}`}>
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
                      variant="whiteFill"
                      {...register('phone')}
                      isError={Boolean(errors.phone)}
                    />
                  </InputMask>

                  {errors.phone && (
                    <div className={`${classes.inputGroup__message}`}>
                      {errors.phone?.type === 'required'
                        ? 'Пожалуйста, введите номер телефона'
                        : 'Номер телефона указан неверно'}
                    </div>
                  )}
                </label>
              </div>

              <div className={`${classes.form__cell} ${classes.inputGroup}`}>
                <label>
                  <div className={classes.inputGroup__title}>Имя</div>
                  <Input
                    s="large"
                    placeholder="Введите имя"
                    variant="whiteFill"
                    {...register('name', { required: true, pattern: nameReg })}
                    onBlur={() => trigger('name')}
                    value={watch('name') || ''}
                    isError={Boolean(errors.name)}
                  />

                  {errors.name && (
                    <div className={`${classes.inputGroup__message}`}>
                      Пожалуйста, заполните имя
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div
              className={`${classes.form__line} ${classes.form__line_spaceB_l} ${
                isLoyalty && classes.form__line_spaceB_lg
              } ${classes.inputGroup}`}>
              <Controller
                control={control}
                rules={{ required: true }}
                name="personalCheckbox"
                render={({ field }) => (
                  <Checkbox
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
                      , даю{' '}
                      <Link href="/documents/docs" target="_blank">
                        согласие на обработку персональных данных
                      </Link>
                    </span>
                  </Checkbox>
                )}
              />
              {errors.personalCheckbox && (
                <div
                  className={`${classes.inputGroup__message} ${classes.inputGroup__message_style_checkbox}`}>
                  Необходимо подтверждение
                </div>
              )}
            </div>

            <Button width="full" type="submit" s="large" variant="whiteFill">
              {formData.buttonText}
            </Button>
          </form>
        </div>

        <ModalS
          isOpen={isModalOpen}
          emitIsOpen={() => setIsModalOpen(true)}
          modifierClassesStyle={['modal_height_s']}>
          <div className={classes.modal}>
            <div className={classes.modal__icon}>
              <Icon name="check2" />
            </div>

            <div className={classes.modal__title}>Запрос принят</div>

            <div className={classes.modal__description}>
              Наш менеджер свяжется <br /> с вами в ближайшее время
            </div>

            <Button onClick={() => setIsModalOpen(false)} s="large" variant="blackFill">
              Хорошо
            </Button>
          </div>
        </ModalS>
      </div>
    )
  return <></>
}
