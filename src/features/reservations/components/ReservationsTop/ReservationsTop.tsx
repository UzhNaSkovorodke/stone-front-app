import classes from './ReservationsTop.module.scss'
import React from 'react'

interface ReservationsTop {
  children?: React.ReactNode
}

export function ReservationsTop({ children }: ReservationsTop) {
  return <div className={classes.root}>{children}</div>
}
