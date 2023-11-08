import classes from './ReservationInfo.module.scss'
import { Flex } from 'shared/uikit/Flex'
import { Icon, IconName } from 'shared/uikit/Icon'
import { Text } from 'shared/uikit/Text'
import React from 'react'
import { InputGroupped } from 'shared/uikit/InputGroupped'
import { Input } from 'shared/uikit/Input'

const InfoBlock = ({ icon, text }: { icon: IconName; text: string }) => {
  return (
    <div className={classes.infoElem}>
      <Icon className={classes.icon} name={icon} />
      <Text className={classes.infoElem__text} s={'14'} w={'500'} lh={'20'} align={'center'}>
        {text}
      </Text>
    </div>
  )
}

export function ReservationInfo() {
  return (
    <>
      <InputGroupped className={classes.inputGroup}>
        <Input
          wrapperClassName={classes.inputWrapper}
          value={'На 14 дней'}
          disabled={true}
          variant={'whiteFill'}
        />
        <Input
          wrapperClassName={classes.inputWrapper}
          value={'200 000 ₽'}
          disabled={true}
          variant={'whiteFill'}
        />
      </InputGroupped>

      <div className={classes.infoWrapper}>
        <Flex className={classes.info}>
          <InfoBlock text={'Квартира бронируется \n за Вами'} icon={'lock_white'} />
          <InfoBlock text={'Цена квартиры \n не меняется \n 14 дней'} icon={'calendarWhite'} />
          <InfoBlock text={'200 000 ₽ \n вшиты в стоимость квартиры'} icon={'pieWhite'} />
        </Flex>
      </div>
    </>
  )
}
