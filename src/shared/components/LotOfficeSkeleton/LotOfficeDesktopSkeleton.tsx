import { withStyles } from '@bruitt/classnames'
import { Box } from '../../uikit/Box'
import { Flex } from '../../uikit/Flex'
import s from './LotOfficeDesktopSkeleton.module.scss'

const sx = withStyles(s)

interface LotOfficeDesktopSkeletonProps {
  variant?: 'full' | 'short'
}

export const LotOfficeDesktopSkeleton = ({ variant = 'full' }: LotOfficeDesktopSkeletonProps) => {
  return (
    <Flex className={s.wrapper} rad="16">
      <Flex className={s.imageWrapper} p="3">
        <Box className={sx(s.img, { variant })} bgColor="neutrals-gray-6" />
      </Flex>
      <Flex
        className={s.content}
        p="3"
        dir="column"
        jc={variant === 'full' ? 'flex-start' : 'center'}>
        <Flex g="3">
          {variant === 'full' && (
            <Flex className={s.info} dir="column">
              <Box className={sx(s.info1v, s.infoV)} bgColor="neutrals-gray-6" />
              <Box className={sx(s.info1l, s.infoL)} bgColor="neutrals-gray-7" />
            </Flex>
          )}
          <Flex className={s.info} dir="column">
            <Box className={sx(s.info2v, s.infoV)} bgColor="neutrals-gray-6" />
            <Box className={sx(s.info2l, s.infoL)} bgColor="neutrals-gray-7" />
          </Flex>
          <Flex className={s.info} dir="column">
            <Box className={sx(s.info3v, s.infoV)} bgColor="neutrals-gray-6" />
            <Box className={sx(s.info3l, s.infoL)} bgColor="neutrals-gray-7" />
          </Flex>
          <Flex className={s.info} dir="column">
            <Box className={sx(s.info4v, s.infoV)} bgColor="neutrals-gray-6" />
            <Box className={sx(s.info4l, s.infoL)} bgColor="neutrals-gray-7" />
          </Flex>
          <Flex className={s.info} dir="column">
            <Box className={sx(s.info5v, s.infoV)} bgColor="neutrals-gray-6" />
            <Box className={sx(s.info5l, s.infoL)} bgColor="neutrals-gray-7" />
          </Flex>
          <Flex className={s.info} dir="column">
            <Box className={sx(s.info6v, s.infoV)} bgColor="neutrals-gray-6" />
            <Box className={sx(s.info6l, s.infoL)} bgColor="neutrals-gray-7" />
          </Flex>
        </Flex>

        {variant === 'full' && (
          <Flex mt="3" g="1">
            <Box className={s.button} bgColor="neutrals-gray-6" />
          </Flex>
        )}
      </Flex>

      {variant === 'full' && (
        <Flex className={s.controls} py="3" pr="3" dir="column" g="2" jc="center">
          <Box className={s.circle} bgColor="neutrals-gray-7" />
          <Box className={s.circle} bgColor="neutrals-gray-7" />
        </Flex>
      )}
    </Flex>
  )
}
