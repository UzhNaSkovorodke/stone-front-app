import React from 'react'
import { ReservationsStatus } from 'src/features/reservations/components/StageStatus/ReservationsStatus'
import { ReservationsTop } from 'src/features/reservations/components/ReservationsTop'
import { ReservationsFooter } from '../ReservationsFooter'
import { ReservationsUnavailable } from './ReservationUnavailable'
import { useRouter } from 'next/router'
import { useClientWidth } from 'shared/hooks/useClientWidth'

interface ReservationStatus {
  status: 'SUCCESS' | 'FAIL'
}

export function StageStatus({ status }: ReservationStatus) {
  const router = useRouter()

  const clientWidth = useClientWidth()

  if (status === 'SUCCESS') {
    return (
      <>
        <ReservationsTop>
          <ReservationsStatus />
        </ReservationsTop>
      </>
    )
  }

  return (
    <>
      <ReservationsTop>
        <ReservationsUnavailable />
      </ReservationsTop>
      <ReservationsFooter
        onClickBackBtn={() => console.log('svyazivaem managera')}
        backBtnText={clientWidth < 1440 ? 'Связаться' : 'Связаться с менеджером'}
        nextBtnText={clientWidth < 1024 ? 'В каталог' : 'Перейти в каталог'}
        onClickNextBtn={() => router.push('/catalog/commercial')}
      />
    </>
  )
}
