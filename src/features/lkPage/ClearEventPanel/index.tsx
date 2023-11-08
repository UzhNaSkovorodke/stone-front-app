import React from 'react'
import { Text } from 'shared/uikit/Text'
import { Flex } from 'shared/uikit/Flex'
import { Button } from 'shared/uikit/Button'
import { Box } from 'shared/uikit/Box'
import { createPortal } from 'react-dom'
import classes from './style.module.scss'
import { withStyles } from '@bruitt/classnames'

const sx = withStyles(classes)
export const ClearEventPanel = ({
  setIsClearModal,
  deleteEvent,
  headerText,
  first_btnText,
  second_btnText,
  className,
  overlayClassName,
  wrapperClassName,
}: {
  headerText: string
  className?: string | undefined
  wrapperClassName?: string | undefined
  overlayClassName?: string | undefined
  first_btnText: string
  second_btnText: string
  deleteEvent: (id?: number | number[]) => void
  setIsClearModal: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <>
      <div className={sx(classes.contentWrapper, wrapperClassName)}>
        <Box className={sx(classes.root, className)}>
          <Text s={'20'} w={'400'} lh={'32'}>
            {headerText}
          </Text>
          <Flex className={classes.btnWrapper}>
            <Button s="small" width="full" variant="blackFill" onClick={() => deleteEvent()}>
              {first_btnText}
            </Button>
            <Button
              s="small"
              width="full"
              variant="blackStroke"
              onClick={() => setIsClearModal(false)}>
              {second_btnText}
            </Button>
          </Flex>
        </Box>
      </div>

      {createPortal(
        <div
          className={sx(classes.overlay, overlayClassName)}
          onClick={() => setIsClearModal(false)}
        />,
        document.body
      )}
    </>
  )
}
