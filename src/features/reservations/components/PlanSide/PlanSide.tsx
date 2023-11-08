import classes from './PlanSide.module.scss'
import Image from 'next/image'
import React from 'react'
import { useClientWidth } from 'shared/hooks/useClientWidth'
import { ReserveLotDescription } from 'src/features/reservations/components/ReserveLotDescription'

export function PlanSide() {
  const clientWidth = useClientWidth()
  return (
    <>
      <div className={classes.root}>
        <Image
          className={classes.planImg}
          src={`${process.env.NEXT_PUBLIC_STONE_API_URL}${'/api/demo-img/commerc-plan.png'}`}
          alt="alt"
          width={485}
          height={418}
          priority
        />
      </div>
      {clientWidth < 1023 ? <ReserveLotDescription /> : false}
    </>
  )
}
