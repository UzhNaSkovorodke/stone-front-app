import classes from './ReserveDataValidate.module.scss'
import React from 'react'
import { Box } from 'shared/uikit/Box'
import { Text } from 'shared/uikit/Text'
import { UserData } from 'src/features/reservations/types/types'

function LineComponent({
  firstColumnValue,
  secondColumnValue,
}: {
  firstColumnValue: string
  secondColumnValue: string | undefined
}) {
  return (
    <>
      <div className={classes.column} placeholder={firstColumnValue}>
        {firstColumnValue}
      </div>
      <div className={[classes.column, classes.rightColumn].join(' ')}>{secondColumnValue}</div>
    </>
  )
}

export const ReserveDataValidate = ({ userData }: { userData: UserData | null }) => {
  const validateArr = [
    { firstColumnValue: 'Фамилия', secondColumnValue: userData?.family },
    { firstColumnValue: 'Имя', secondColumnValue: userData?.name },
    { firstColumnValue: 'Отчество', secondColumnValue: userData?.lastname },
    {
      firstColumnValue: 'Серия и номер паспорта',
      secondColumnValue: userData?.passport,
    },
    {
      firstColumnValue: 'Телефон',
      secondColumnValue: userData?.phone
        ? userData.phone
        : JSON.parse(localStorage.User).userData.phone,
    },
    {
      firstColumnValue: 'E-mail',
      secondColumnValue: userData?.email
        ? userData.email
        : JSON.parse(localStorage.User).userData.email,
    },
  ]

  return (
    <Box className={classes.root}>
      <Text
        className={classes.subHeader}
        s={'20'}
        w={'400'}
        lh={'32'}
        color={'neutrals-white'}
        align={'center'}>
        Проверьте свои данные и при необходимости исправьте их на предыдущем шаге. Если верно,
        перейдите к оплате
      </Text>

      <div className={classes.validateWrapper}>
        {validateArr.map((elem, index) => {
          return (
            <LineComponent
              key={index}
              firstColumnValue={elem.firstColumnValue}
              secondColumnValue={elem.secondColumnValue}
            />
          )
        })}
      </div>
    </Box>
  )
}
