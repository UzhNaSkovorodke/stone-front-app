import classes from './ReservationsUnavailable.module.scss'
import React from 'react'
import { Box } from 'shared/uikit/Box'
import { Text } from 'shared/uikit/Text'
import { ReserveLotDescription } from 'src/features/reservations/components/ReserveLotDescription'
import { ReservationsHeader } from 'src/features/reservations/components/ReservationsHeader'
import { useClientWidth } from 'shared/hooks/useClientWidth'
import { Icon } from 'shared/uikit/Icon'

export function ReservationsUnavailable() {
  const clientWidth = useClientWidth()

  return (
    <Box className={classes.root} mt={'5'}>
      <Box mb={'5'} className={classes.svg__fail}>
        <Icon name="unavailable" />
      </Box>
      <ReservationsHeader text={'Объект больше недоступен \n для бронирования'} />
      <Text
        className={classes.errorMessage}
        lh="24"
        s="16"
        w="400"
        color="neutrals-gray-5"
        align={'center'}>
        Денежные средства вернутся на счет в течение
        <br />
        нескольких минут
      </Text>
      {clientWidth >= 1023 && <ReserveLotDescription />}

      <Box mb={'4'}>
        <Text
          className={classes.subHeader}
          lh={'32'}
          s={'20'}
          w={'400'}
          color="neutrals-white"
          align={'center'}>
          По всем вопросам вы можете обратиться к&nbsp;менеджеру
        </Text>
      </Box>
    </Box>
  )
}
