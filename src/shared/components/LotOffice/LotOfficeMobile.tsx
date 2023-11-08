import { Box } from '../../uikit/Box'
import { DisableWrapper } from '../../uikit/DisableWrapper'
import { Flex } from '../../uikit/Flex'
import { TagStack } from '../../uikit/TagStack'
import { Text } from '../../uikit/Text'
import { LotOfficeProps } from '.'
import Image from 'next/image'
import { formatPrice } from '../../utils/formatPrice'
import { Status } from '../../uikit/Status'
import { hexToRgbString } from '../../utils/hexToRgbString'

import s from './LotOfficeMobile.module.scss'

export const LotOfficeMobile = ({
  lot,
  types,
  isLocked = false,
  buttons,
  iconButtons,
  meet,
}: LotOfficeProps) => {
  const price = lot.sellingPrice ? `${formatPrice(parseFloat(lot.sellingPrice))} ₽` : '-'
  const pricePerMeter = lot.sellingPricePerMeter
    ? `${formatPrice(parseFloat(lot.sellingPricePerMeter))} ₽/м²`
    : '-'

  const popular = lot.promo ? lot.promo.find((p) => p.slug === 'popularLot') : null

  return (
    <Box className={s.wrapper} rad={meet === true ? 'bottom-16' : '16'}>
      <DisableWrapper isDisabled={isLocked}>
        <Flex className={s.imageWrapper} p="4" ai="center" jc="center">
          {lot.floorPlanImg ? (
            <Image src={`${lot.floorPlanImg}`} alt="alt" width={263} height={145} priority />
          ) : (
            <div style={{ width: 263, height: 145 }} />
          )}
          {popular && (
            <div className={s.popular}>
              <Status
                style={{
                  background: `rgba(${hexToRgbString(popular.color)}, 0.1)`,
                  color: popular.color,
                }}
                pre={<Image src={`${popular.icoImg}`} alt="icon" width={12} height={12} />}
                text={popular.val}
              />
            </div>
          )}
        </Flex>
      </DisableWrapper>

      <Box p="3">
        <DisableWrapper isDisabled={isLocked}>
          <Text s="12" lh="16" w="400">
            {lot.type ? types[lot.type] : '-'}
          </Text>
          <Flex ai="center" jc="space-between">
            <Text s="20" lh="32" w="400">
              {price}
            </Text>
            <Text s="12" lh="16" w="400" color="neutrals-gray-4">
              {pricePerMeter}
            </Text>
          </Flex>
          <Text s="12" lh="16" w="400" color="neutrals-gray-4">
            Лот {lot.number || '-'}
          </Text>
          <Box mt="2" color="neutrals-gray-3">
            <TagStack variant="text" size="small">
              <Text s="12" lh="16" w="400">
                {lot.housing || '-'}
              </Text>
              <Text s="12" lh="16" w="400">
                {lot.area || '-'} м²
              </Text>
              <Text s="12" lh="16" w="400">
                Этаж {lot.floor || '-'} из {lot.floorsNumber || '-'}
              </Text>
            </TagStack>
          </Box>
        </DisableWrapper>
        <Flex mt="3" g="1">
          <DisableWrapper className={s.button} isDisabled={isLocked}>
            <Flex g="1">{buttons}</Flex>
          </DisableWrapper>
          <Flex className={s.iconWrapper} g="1">
            {iconButtons}
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}
