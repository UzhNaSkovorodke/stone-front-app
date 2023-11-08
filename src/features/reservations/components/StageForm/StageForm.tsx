import React, { useRef } from 'react'
import { ReserveLotDescription } from 'src/features/reservations/components/ReserveLotDescription'
import { ReservationsFooter } from 'src/features/reservations/components/ReservationsFooter'
import { Stages, UserData } from 'src/features/reservations/types/types'
import { ReservationsTop } from 'src/features/reservations/components/ReservationsTop'
import { ReservationsHeader } from 'src/features/reservations/components/ReservationsHeader'
import { Box } from 'shared/uikit/Box'
import { Text } from 'shared/uikit/Text'
import { Grid } from 'shared/uikit/Grid'
import { Input } from 'shared/uikit/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import classes from './StageForm.module.scss'
import InputMask from 'react-input-mask'
import { passportMask } from 'src/features/reservations/constants/form'

interface IFormInput {
  family: string
  name: string
  lastname: string
  passport: string
  phone: string
  email: string
}

interface StageForm {
  userData: UserData | null
  setStage: React.Dispatch<React.SetStateAction<Stages>>
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>
  isErrorAfterPayment: boolean
}

export function StageForm({ setStage, setUserData, userData, isErrorAfterPayment }: StageForm) {
  const formRef = useRef<HTMLFormElement>(null)
  const { register, handleSubmit, watch } = useForm<IFormInput>({ mode: 'all' })
  const validName = /^((([а-яА-ЯЁё-]){1,30})(\s{1,3}|)){1,5}$/u
  const validPassport = /^\d+\s+\d+\s+\d+$/i
  const passportValue = watch('passport')
  //комм Email может и не быть поэтому если есть то дизейбл, а если нет то как необязательное поле
  const emailDefault = userData?.email
    ? userData?.email
    : JSON.parse(localStorage.User)?.userData?.email
    ? JSON.parse(localStorage.User)?.userData.email
    : ''
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const userData: any = data
    for (const prop in userData) {
      userData[`${prop}`] = userData[`${prop}`].replace(/\s+/g, ' ').trim()
    }
    setUserData(userData)
    setStage('VALIDATE')
  }

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <ReservationsTop>
          <ReservationsHeader text={'Бронирование'} />
          <div className={classes.lotDescription}>
            <ReserveLotDescription />
          </div>

          <Box className={classes.form}>
            <div className={classes.subHeader}>
              {!isErrorAfterPayment ? (
                <div>
                  Укажите данные лица, которое будет являться основным приобретателем по договору
                </div>
              ) : (
                <div className={classes.subHeader__error}>
                  К сожалению, оплата не прошла.
                  <br /> Повторите попытку
                </div>
              )}
            </div>

            <Grid cols={'2'} g={'2'} className={classes.fieldsWrapper}>
              <label>
                <Text s={'12'} w={'400'} lh={'16'} color="neutrals-white">
                  Фамилия
                </Text>
                <Box className={classes.inputWrapper} mt={'1'}>
                  <Input
                    placeholder={'Введите фамилию'}
                    variant={'whiteFill'}
                    defaultValue={userData?.family}
                    {...register('family', {
                      required: true,
                      pattern: validName,
                    })}
                  />
                </Box>
              </label>

              <label>
                <Text s={'12'} w={'400'} lh={'16'} color="neutrals-white">
                  Имя
                </Text>
                <Box className={classes.inputWrapper} mt={'1'}>
                  <Input
                    placeholder={'Введите имя'}
                    defaultValue={userData?.name}
                    variant={'whiteFill'}
                    {...register('name', {
                      required: true,
                      pattern: validName,
                    })}
                  />
                </Box>
              </label>

              <label>
                <Text s={'12'} w={'400'} lh={'16'} color="neutrals-white">
                  Отчество
                </Text>
                <Box className={classes.inputWrapper} mt={'1'}>
                  <Input
                    placeholder={'Введите отчество'}
                    defaultValue={userData?.lastname}
                    variant={'whiteFill'}
                    {...register('lastname', {
                      required: true,
                      pattern: validName,
                    })}
                  />
                </Box>
              </label>

              <label>
                <Text s={'12'} w={'400'} lh={'16'} color="neutrals-white">
                  Серия и номер паспорта
                </Text>
                <Box className={classes.inputWrapper} mt={'1'}>
                  <InputMask
                    autoComplete="off"
                    className={classes.inputMask}
                    defaultValue={userData?.passport}
                    placeholder={'– –     – –     – – – – – –'}
                    mask={passportValue ? passportMask : ''}
                    {...register('passport', {
                      required: true,
                      pattern: validPassport,
                    })}
                  />
                </Box>
              </label>

              <label>
                <Text s={'12'} w={'400'} lh={'16'} color="neutrals-white">
                  Телефон
                </Text>
                <Box mt={'1'}>
                  <Input
                    disabled={true}
                    autoComplete={'false'}
                    wrapperClassName={classes.input__default}
                    value={
                      userData?.phone
                        ? userData?.phone
                        : JSON.parse(localStorage.User)?.userData?.phone
                    }
                    variant={'whiteFill'}
                  />
                </Box>
              </label>

              <label>
                <Text s={'12'} w={'400'} lh={'16'} color="neutrals-white">
                  Email
                </Text>
                <Box className={classes.inputWrapper} mt={'1'}>
                  <Input
                    disabled={!!emailDefault}
                    placeholder={'Введите почту'}
                    wrapperClassName={emailDefault ? classes.input__default : ''}
                    value={emailDefault ? emailDefault : 'none'}
                    variant={'whiteFill'}
                  />
                </Box>
              </label>
            </Grid>
          </Box>
        </ReservationsTop>
        <ReservationsFooter
          onClickBackBtn={() => setStage('AGREEMENT')}
          backBtnText={'Назад'}
          nextBtnText={'Далее'}
        />
      </form>
    </>
  )
}
