import { ReserveLotDescription } from 'src/features/reservations/components/ReserveLotDescription'
import { ReservationsFooter } from 'src/features/reservations/components/ReservationsFooter'
import React from 'react'
import { ReserveDataValidate } from 'src/features/reservations/components/StageValidate/ReserveDataValidate'
import { Stages, UserData } from 'src/features/reservations/types/types'
import { ReservationsTop } from 'src/features/reservations/components/ReservationsTop'
import { ReservationsHeader } from 'src/features/reservations/components/ReservationsHeader'
import classes from './StageValidate.module.scss'

interface StageValidate {
  setStage: React.Dispatch<React.SetStateAction<Stages>>
  setIsErrorAfterPayment: React.Dispatch<React.SetStateAction<boolean>>
  userData: UserData | null
}

export function StageValidate({
  setStage,
  userData,
}: //setIsErrorAfterPayment
StageValidate) {
  return (
    <>
      <ReservationsTop>
        <ReservationsHeader text={'Бронирование'} />
        <div className={classes.lotDescription}>
          <ReserveLotDescription />
        </div>
        <ReserveDataValidate userData={userData} />
      </ReservationsTop>
      <ReservationsFooter
        backBtnText={'Назад'}
        onClickBackBtn={() => setStage('FORM')}
        onClickNextBtn={() => {
          //комм это кейс когда оплата не прошла
          // setIsErrorAfterPayment(true)
          // setStage('FORM')
          setStage('STATUS')
        }}
        nextBtnText={'Перейти к оплате'}
      />
    </>
  )
}
