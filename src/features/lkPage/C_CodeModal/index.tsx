import { axiosStone } from 'shared/services/axiosConfig'
import classes from './style.module.scss'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import {
  KeyboardEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react'
import { useRouter } from 'next/router'
import { Button } from 'shared/uikit/Button'
import { StoreContext } from 'src/store/storeContext'
import { Icon } from 'shared/uikit/Icon'

export const C_CodeModal = ({
  setIsOpen,
  phoneNumber,
  isRegistration,
  setIsToken,
  setIsCode,
  setIsRegistration,
}: {
  phoneNumber: string
  isRegistration: boolean
  setIsToken: Dispatch<SetStateAction<boolean>>
  setIsRegistration: Dispatch<SetStateAction<boolean>>
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setIsCode: Dispatch<SetStateAction<boolean>>
}) => {
  type FormValues = {
    code1: string
    code2: string
    code3: string
    code4: string
  }
  const lkStoreContext = useContext(StoreContext)
  const [seconds, setSeconds] = useState<number>(120)
  const [timerActive, setTimerActive] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    if (seconds > 0 && timerActive) {
      setTimeout(setSeconds, 1000, seconds - 1)
    } else {
      setTimerActive(false)
    }
  }, [seconds, timerActive])

  const inputList = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const { register, handleSubmit, watch } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      code1: '',
      code2: '',
      code3: '',
      code4: '',
    },
  })

  const codeInput = watch(['code1', 'code2', 'code3', 'code4']).join('')

  const onBtnUp = function (e: KeyboardEvent<HTMLDivElement>) {
    const target = e.target as HTMLButtonElement
    let next = target.nextSibling as HTMLButtonElement
    const prev = target.previousElementSibling as HTMLButtonElement
    const attributes = target.attributes as any
    const maxLength = parseInt(attributes?.maxlength?.value, 10)
    const myLength = target.value.length

    if (myLength >= maxLength) {
      while (next) {
        if (!next) break
        if (next.tagName.toLowerCase() === 'input') {
          next.focus()
          break
        } else {
          break
        }
      }
    }

    if (myLength === 0) {
      setIsError(false)
      while ((next = prev)) {
        if (!next) break
        if (next.tagName.toLowerCase() == 'input') {
          next.focus()
          break
        } else {
          break
        }
      }
    }
  }

  const onBtnDown = function (e: KeyboardEvent<HTMLDivElement>) {
    const target = e.target as HTMLButtonElement
    target.value = ''
  }

  const onSubmit = async (): Promise<void> => {
    await axiosStone
      .post(
        '/login',
        {
          phone: phoneNumber.replace(/[\(\)\+\ \-*]/gi, ''),
          code: Number(codeInput),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        res.status === 200 && res.data.data[0] !== null
          ? (lkStoreContext.user.handleLogin(res.data.data),
            setIsToken(true),
            router.push('/lk/favorites'))
          : setIsError(true)
      })
      .catch((error) => {
        error.response.data.status === 'fail' &&
        error.response.data.message === 'Wrong Phone or Code'
          ? setIsError(true)
          : console.log(error)
      })
  }

  useEffect(() => {
    setIsError(false)

    if (codeInput.length === 4) {
      handleSubmit(onSubmit)()
    }
  }, [codeInput])

  const onCodeBtnClick = function (): void {
    setTimerActive(true)
    setSeconds(120)

    axiosStone
      .post(
        '/get-code',
        {
          phone: phoneNumber.replace(/[\(\)\+\ \-*]/gi, ''),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        res.data.status === 'success' ? console.log('код получен') : console.log('ошибочка')
      })
      .catch((error) => console.log(error))
  }
  //TODO переписать на uikit компоненты
  return (
    <div className={classNames(classes.root)}>
      <button
        type="button"
        className={classes.backBtn}
        onClick={() =>
          isRegistration ? (setIsCode(false), setIsRegistration(true)) : setIsCode(false)
        }>
        <Icon name="arrowLongLeft" />
      </button>
      <h2 dangerouslySetInnerHTML={{ __html: `Код из СМС` }}></h2>
      <button type="button" className={classes.closeBtn} onClick={() => setIsOpen(false)}>
        <Icon name="close" />
      </button>
      <p
        dangerouslySetInnerHTML={{
          __html: `Код отправлен на номер <br class='brOnlyDesktop'/><nobr>${phoneNumber}</nobr>`,
        }}></p>
      <p>Код для разработки 4444</p>
      <form className={classes.form}>
        <div
          className={classNames(classes.pinCode, {
            [classes.pinCodeError]: isError,
          })}
          ref={inputList}
          onKeyUp={(e: KeyboardEvent<HTMLDivElement>) => onBtnUp(e)}
          onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => onBtnDown(e)}>
          <input
            maxLength={1}
            autoFocus
            autoComplete="off"
            type="number"
            placeholder={'-'}
            className={classNames(classes.codeInput, {
              [classes.codeError]: isError,
            })}
            {...register('code1', { required: true })}
          />
          <input
            maxLength={1}
            type="number"
            autoComplete="off"
            placeholder={'-'}
            className={classNames(classes.codeInput, {
              [classes.codeError]: isError,
            })}
            {...register('code2', { required: true })}
          />
          <input
            maxLength={1}
            type="number"
            autoComplete="off"
            placeholder={'-'}
            className={classNames(classes.codeInput, {
              [classes.codeError]: isError,
            })}
            {...register('code3', { required: true })}
          />
          <input
            maxLength={1}
            type="number"
            autoComplete="off"
            placeholder={'-'}
            className={classNames(classes.codeInput, {
              [classes.codeError]: isError,
            })}
            {...register('code4', { required: true })}
          />
          {isError ? <p className={classes.error}>Код введен неверно</p> : null}
        </div>
        <Button
          s="large"
          width="full"
          variant="blackStroke"
          onClick={() => onCodeBtnClick()}
          disabled={timerActive ? true : false}>
          Отправить код еще раз {timerActive ? seconds + ' сек' : null}
        </Button>
      </form>
    </div>
  )
}
