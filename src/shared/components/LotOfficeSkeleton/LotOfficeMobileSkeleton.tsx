import { Box } from '../../uikit/Box'
import { Flex } from '../../uikit/Flex'

import s from './LotOfficeMobileSkeleton.module.scss'

export const LotOfficeMobileSkeleton = () => {
  return (
    <Box className={s.wrapper} rad="16">
      <Flex className={s.imageWrapper} p="4" ai="center" jc="center">
        <Box className={s.skeletonImage} bgColor="neutrals-gray-6" />
      </Flex>
      <Box p="3">
        <Box className={s.type} bgColor="neutrals-gray-7" />
        <Flex ai="center" jc="space-between" mt="1">
          <Box className={s.price} bgColor="neutrals-gray-6" />
          <Box className={s.pricePer} bgColor="neutrals-gray-7" />
        </Flex>
        <Box className={s.lot} mt="1" bgColor="neutrals-gray-7" />
        <Flex mt="2" g="1">
          <Box className={s.tab} bgColor="neutrals-gray-6" />
          <Box className={s.tab} bgColor="neutrals-gray-6" />
          <Box className={s.tab} bgColor="neutrals-gray-6" />
        </Flex>
        <Flex mt="3" g="1">
          <Box className={s.button} bgColor="neutrals-gray-6" />
          <Box className={s.iconButton} bgColor="neutrals-gray-6" />
          <Box className={s.iconButton} bgColor="neutrals-gray-6" />
        </Flex>
      </Box>
    </Box>
  )
}
