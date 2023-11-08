import classes from './ReservationsHeader.module.scss'
import React from 'react'
import { Text } from 'shared/uikit/Text'

export function ReservationsHeader({ text }: { text: string }) {
  return (
    <Text className={classes.root} align={'center'} color="neutrals-white">
      {text}
    </Text>
  )
}
