import classes from './ReservationsFooter.module.scss'
import { Flex } from 'shared/uikit/Flex'
import { Button } from 'shared/uikit/Button'
import { Box } from 'shared/uikit/Box'
import React from 'react'

interface ReservationsFooter {
  backBtnText: string
  nextBtnText: string
  onClickBackBtn: () => void
  onClickNextBtn?: () => void
}

export function ReservationsFooter({
  backBtnText,
  onClickBackBtn,
  nextBtnText,
  onClickNextBtn,
}: ReservationsFooter) {
  return (
    <Box bgColor={'neutrals-gray-2'} className={classes.root}>
      <Flex jc={'center'}>
        <Button variant={'whiteStroke'} onClick={() => onClickBackBtn()}>
          {backBtnText}
        </Button>
        <Button
          type={'submit'}
          onClick={() => {
            onClickNextBtn ? onClickNextBtn() : false
          }}
          variant={'whiteFill'}>
          {nextBtnText}
        </Button>
      </Flex>
    </Box>
  )
}
