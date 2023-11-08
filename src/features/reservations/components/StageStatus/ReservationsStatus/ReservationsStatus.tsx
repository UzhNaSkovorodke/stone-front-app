import classes from './ReservationsStatus.module.scss'
import React from 'react'
import { Box } from 'shared/uikit/Box'
import { Text } from 'shared/uikit/Text'
import { ReserveLotDescription } from 'src/features/reservations/components/ReserveLotDescription'
import { Button } from 'shared/uikit/Button'
import { ReservationsHeader } from 'src/features/reservations/components/ReservationsHeader'
import { Flex } from 'shared/uikit/Flex'
import Link from 'next/link'
import { Icon } from 'shared/uikit/Icon'

export function ReservationsStatus() {
  return (
    <Box className={classes.root}>
      <Box mb={'5'} className={classes.svg__success}>
        <Icon name="success" />
      </Box>
      <ReservationsHeader text={'Объект забронирован! \n До 25 июля 2023'} />
      <div className={classes.lotDescription}>
        <ReserveLotDescription />
      </div>
      <Text
        className={classes.subHeader}
        lh={'32'}
        s={'20'}
        w={'400'}
        color="neutrals-white"
        align={'center'}>
        По всем вопросам вы можете обратиться к менеджеру
      </Text>

      <Flex jc={'center'}>
        <Link href="/lk/booking">
          <Button className={classes.btnWrapper} variant={'whiteFill'}>
            Перейти в мои бронирования
          </Button>
        </Link>
      </Flex>
    </Box>
  )
}
