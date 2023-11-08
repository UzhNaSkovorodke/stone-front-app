import { axiosStone } from 'shared/services/axiosConfig'
import { Button } from 'shared/uikit/Button'
import { Input } from 'shared/uikit/Input'
import classNames from 'classnames'
import { Dispatch, SetStateAction, useRef } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import InputMask from 'react-input-mask'
import classes from './style.module.scss'
import { Icon } from 'shared/uikit/Icon'

export const C_LoginModal = ({
  setIsOpen,
  setPhoneNumber,
  setIsCode,
  setIsRegistration,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setIsCode: Dispatch<SetStateAction<boolean>>
  setIsRegistration: Dispatch<SetStateAction<boolean>>
  phoneNumber: string
  setPhoneNumber: Dispatch<SetStateAction<string>>
}) => {
  type FormValues = {
    phone: string
    code?: number
  }

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      // TODO: @selivanov исправить на phone: ''
      phone: '+7 (444) 444-44-44',
    },
  })

  const validValue = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}/g

  const phoneInput = useWatch({ control, name: 'phone' })

  const { onChange, onBlur, ref, ...rest } = register('phone', {
    required: 'Пожалуйста, введите номер телефона',
    pattern: {
      value: validValue,
      message:
        phoneInput.length === 0
          ? 'Пожалуйста, введите номер телефона'
          : 'Номер телефона указан неверно',
    },
  })

  const phoneRef = useRef<HTMLInputElement | null>(null)

  const onSubmit = async (): Promise<void> => {
    axiosStone
      .post(
        '/login',
        {
          phone: phoneInput.replace(/[\(\)\+\ \-*]/gi, ''),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        res.status === 200 && res.data.data[0] !== null ? setIsCode(true) : setIsRegistration(true)
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className={classNames(classes.root)} data-cy="login-modal">
      <button type="button" className={classes.closeBtn} onClick={() => setIsOpen(false)}>
        <Icon name="close" />
      </button>
      <h2>Личный кабинет</h2>
      <p
        dangerouslySetInnerHTML={{
          __html: `Введите номер телефона для авторизации <br/> или&nbsp;регистрации`,
        }}></p>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.errorWrapper}>
          <label>Номер телефона</label>
          <InputMask
            alwaysShowMask={false}
            autoComplete="phone"
            value={phoneInput}
            inputMode="numeric"
            name="phone"
            onKeyDown={(e) =>
              e.key === 'Backspace' && phoneInput.length < 5 ? setValue('phone', '') : null
            }
            mask={phoneInput === '+7 (' ? '' : '+7 (999) 999-99-99'}
            maskPlaceholder={null}
            placeholder={'+7 ( - - - ) - - -  - -  - -'}
            onChange={onChange}
            onBlur={phoneInput === '+7 (' ? () => setValue('phone', '') : onBlur}>
            <Input
              ref={(e) => {
                ref(e)
                phoneRef.current = e
              }}
              data-cy="login-phone"
              variant="blackFill"
              {...rest}
              type="text"
              s="large"
              isError={errors?.phone ? true : false}
            />
          </InputMask>
          {errors?.phone && <p className={classes.error}>{errors.phone.message}</p>}
        </div>
        <Button
          data-cy="login-button"
          s="large"
          width="full"
          variant="blackFill"
          onClick={() => (phoneRef.current ? setPhoneNumber(phoneRef?.current?.value) : null)}
          disabled={errors?.phone ? true : false}
          type="submit">
          Далее
        </Button>
      </form>
    </div>
  )
}
