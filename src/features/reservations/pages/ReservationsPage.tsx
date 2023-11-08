import React, { useContext, useEffect, useState } from 'react'
import classes from './ReservationsPage.module.scss'
import { PlanSide } from 'src/features/reservations/components/PlanSide'
import { StageForm } from 'src/features/reservations/components/StageForm'
import { StageInfo } from 'src/features/reservations/components/StageInfo'
import { StageAgreement } from 'src/features/reservations/components/StageAgreement'
import { StageValidate } from 'src/features/reservations/components/StageValidate'
import { StageStatus } from 'src/features/reservations/components/StageStatus'
import { Stages, UserData } from 'src/features/reservations/types/types'
import { StoreContext } from 'src/store/storeContext'

export function ReservationsPage() {
  const [stage, setStage] = useState<Stages>('INFO')
  const [isErrorAfterPayment, setIsErrorAfterPayment] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const lkStoreContext = useContext(StoreContext)
  const stageHandler = (stage: Stages) => {
    switch (stage) {
      case 'INFO':
        return <StageInfo setStage={setStage} />
      case 'AGREEMENT':
        return <StageAgreement setStage={setStage} />
      case 'FORM':
        return (
          <StageForm
            isErrorAfterPayment={isErrorAfterPayment}
            setUserData={setUserData}
            userData={userData}
            setStage={setStage}
          />
        )
      case 'VALIDATE':
        return (
          <StageValidate
            userData={userData}
            setStage={setStage}
            setIsErrorAfterPayment={setIsErrorAfterPayment}
          />
        )
      case 'STATUS':
        return <StageStatus status="FAIL" />
      default:
        return <StageInfo setStage={setStage} />
    }
  }

  useEffect(() => {
    //TODO: @tiukalov - убрать временное решение когда разберемся с websocket
    lkStoreContext.fetchFavorites()
    lkStoreContext.fetchSelections()
    lkStoreContext.fetchMeetings()
  }, [])

  return (
    <div className={classes.root}>
      <main className={classes.mainWrapper}>
        <PlanSide />
        <div className={classes.reservationsSide}>{stageHandler(stage)}</div>
      </main>
    </div>
  )
}
