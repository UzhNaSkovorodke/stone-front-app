import { Text } from 'shared/uikit/Text'
import { ReserveLotDescription } from 'src/features/reservations/components/ReserveLotDescription'
import { ReservationInfo } from 'src/features/reservations/components/StageInfo/ReservationInfo'
import { ReservationsFooter } from 'src/features/reservations/components/ReservationsFooter'
import React from 'react'
import { Stages } from 'src/features/reservations/types/types'
import { ReservationsTop } from 'src/features/reservations/components/ReservationsTop'
import classes from './StageInfo.module.scss'
import { ReservationsHeader } from 'src/features/reservations/components/ReservationsHeader'
import { useRouter } from 'next/router'

interface StageInfo {
  setStage: React.Dispatch<React.SetStateAction<Stages>>
}

export function StageInfo({ setStage }: StageInfo) {
  const router = useRouter()
  return (
    <>
      <ReservationsTop>
        <ReservationsHeader text={'Бронирование'} />
        <div className={classes.lotDescription}>
          <ReserveLotDescription />
        </div>

        <div className={classes.subHeader}>
          <Text lh={'24'} s={'16'} w={'400'} color="neutrals-gray-5" align={'center'}>
            Процесс бронирования займет несколько минут. Потребуется ознакомиться с условиями,
            заполнить личные данные и оплатить бронирование банковской картой
          </Text>
        </div>
        <ReservationInfo />
      </ReservationsTop>
      <ReservationsFooter
        onClickBackBtn={() => router.push('/lk/favorites')}
        backBtnText={'Назад'}
        nextBtnText={'Начать бронирование'}
        onClickNextBtn={() => setStage('AGREEMENT')}
      />
    </>
  )
}
