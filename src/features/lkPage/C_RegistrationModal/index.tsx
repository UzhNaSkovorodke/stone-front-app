import { axiosStone } from 'shared/services/axiosConfig'
import { Button } from 'shared/uikit/Button'
import { Input } from 'shared/uikit/Input'
import classNames from 'classnames'
import Link from 'next/link'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import InputMask from 'react-input-mask'
import classes from './style.module.scss'
import { Icon } from 'shared/uikit/Icon'

export const C_RegistrationModal = ({
  setIsOpen,
  phoneNumber,
  setPhoneNumber,
  setIsCode,
  setIsRegistration,
}: {
  phoneNumber: string
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setIsCode: Dispatch<SetStateAction<boolean>>
  setIsRegistration: Dispatch<SetStateAction<boolean>>
  setPhoneNumber: Dispatch<SetStateAction<string>>
}) => {
  type FormValues = {
    phone: string
    name: string
    email: string
    news?: boolean
    policyAgree: boolean
  }

  const [isNews, setIsNews] = useState<boolean>(false)
  const [isPolicy, setIsPolicy] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      phone: phoneNumber,
      name: '',
      email: '',
      news: false,
      policyAgree: false,
    },
  })

  const phoneInput = useWatch({ control, name: 'phone' })
  const nameInput = useWatch({ control, name: 'name' })
  const emailInput = useWatch({ control, name: 'email' })

  const validValue = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}/g
  const validName =
    /^((([а-яА-ЯЁё-]){1,30})(\s{1,3}|)){1,5}$|^((([a-zA-Z-'`]){1,30})(\s{1,3}|)){1,5}$/u
  const validEmail = /\S+@\S+\.\S+/

  const { onChange, onBlur, ...restPhone } = register('phone', {
    required: 'Пожалуйста, введите номер телефона',
    pattern: {
      value: validValue,
      message: !phoneInput.length
        ? 'Пожалуйста, введите номер телефона'
        : 'Номер телефона указан неверно',
    },
  })

  const onSubmit = async (): Promise<void> => {
    axiosStone
      .post(
        '/register',
        {
          first_name: nameInput,
          email: emailInput,
          phone: phoneInput.replace(/[\(\)\+\ \-*]/gi, ''),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        res.data.status === 'success'
          ? (setPhoneNumber(phoneInput), clearErrors(), setIsCode(true))
          : console.log('ошибочка')
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className={classNames(classes.root)}>
      <button type="button" className={classes.backBtn} onClick={() => setIsRegistration(false)}>
        <Icon name="arrowLongLeft" />
      </button>
      <h2>Регистрация</h2>
      <button type="button" className={classes.closeBtn} onClick={() => setIsOpen(false)}>
        <Icon name="close" />
      </button>

      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.errorWrapper}>
          <label>Телефон</label>
          <InputMask
            alwaysShowMask={false}
            autoComplete="new-phone"
            name="phone"
            placeholder={'+7 ( - - - ) - - -  - -  - -'}
            mask={'+7 (999) 999-99-99'}
            onChange={onChange}
            onBlur={onBlur}>
            <Input
              variant="blackFill"
              {...restPhone}
              type="text"
              s="large"
              isError={errors?.phone ? true : false}
            />
          </InputMask>
          {errors?.phone && <p className={classes.error}>{errors.phone.message}</p>}
        </div>
        <div className={classes.errorWrapper}>
          <label>Имя</label>
          <Input
            type="text"
            placeholder={'Введите имя'}
            {...register('name', {
              required: 'Пожалуйста, заполните имя',
              pattern: {
                value: validName,
                message: 'Неверный формат',
              },
            })}
            variant="blackFill"
            s="large"
            isError={errors?.name ? true : false}
          />
          {errors?.name && <p className={classes.error}>{errors?.name?.message}</p>}
        </div>
        <div className={classes.errorWrapper}>
          <label>E-mail</label>
          <Input
            type="text"
            placeholder={'example@gmail.com'}
            {...register('email', {
              required: 'Пожалуйста, заполните e-mail',
              pattern: {
                value: validEmail,
                message: 'Неверный формат',
              },
            })}
            variant="blackFill"
            s="large"
            isError={errors?.email ? true : false}
          />
          {errors?.email && <p className={classes.error}>{errors?.email?.message}</p>}
        </div>
        <div className={classes.checkboxWrapper}>
          <div className={classes.checkboxError}>
            <input type="checkbox" checked={isNews} {...register('news')} />
            <label onClick={() => setIsNews((prev) => !prev)}>
              Согласен(-на) получать новости, информацию по сделке и
              <Link
                href="/documents/soglasie-na-rassylki"
                rel="noreferrer"
                target="_blank"
                className={classes.links}>
                {' '}
                рекламу
              </Link>{' '}
              от Stone
            </label>
          </div>
          <div
            className={classes.checkboxError}
            onClick={() => (setIsPolicy((prev) => !prev), clearErrors('policyAgree'))}>
            <input type="checkbox" checked={isPolicy} {...register('policyAgree')} />
            <label>
              Я принимаю условия
              <Link
                href="/documents/politika-konfidenczialnosti"
                rel="noreferrer"
                target="_blank"
                className={classes.links}>
                {' '}
                Политики обработки и защиты персональных данных
              </Link>
              , даю{' '}
              <Link
                href="/documents/docs"
                rel="noreferrer"
                target="_blank"
                className={classes.links}>
                согласие на обработку персональных данных
              </Link>
            </label>
            {errors?.policyAgree && <p className={classes.error}>{errors.policyAgree?.message}</p>}
          </div>
        </div>
        <Button
          s="large"
          width="full"
          variant="blackFill"
          disabled={errors?.phone || errors?.email || errors?.policyAgree ? true : false}
          onClick={() => {
            !isPolicy
              ? setError('policyAgree', {
                  type: 'custom',
                  message: 'Необходимо подтверждение',
                })
              : null
          }}
          type="submit">
          Далее
        </Button>
      </form>
    </div>
  )
}
