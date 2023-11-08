import { DisableWrapper } from '../../uikit/DisableWrapper'
import { Flex } from '../../uikit/Flex'
import { Text } from '../../uikit/Text'
import { LotOfficeProps } from '.'
import Image from 'next/image'
import { formatPrice } from '../../utils/formatPrice'

import s from './LotOfficeDesktop.module.scss'
import { Status } from '../../uikit/Status'
import { hexToRgbString } from '../../utils/hexToRgbString'
import { Grid } from 'shared/uikit/Grid'

export const LotOfficeDesktop = ({
  lot,
  types,
  isGrid = false,
  isLocked = false,
  variant = 'full',
  buttons,
  iconButtons,
  meet,
}: LotOfficeProps) => {
  const price = lot.sellingPrice ? `${formatPrice(parseFloat(lot.sellingPrice))} ₽` : '-'
  const pricePerMeter = lot.sellingPricePerMeter
    ? `${formatPrice(parseFloat(lot.sellingPricePerMeter))} ₽/м²`
    : '-'

  return (
    <Flex className={s.wrapper} rad={meet === true ? 'bottom-16' : '16'}>
      <DisableWrapper isDisabled={isLocked}>
        <Flex className={s.imageWrapper} p="3">
          {lot.floorPlanImg ? (
            <Image
              src={`${lot.floorPlanImg}`}
              alt="alt"
              width={130}
              height={variant === 'full' ? 96 : 72}
              priority
            />
          ) : (
            <div style={{ width: 130, height: variant === 'full' ? 96 : 72 }} />
          )}
        </Flex>
      </DisableWrapper>

      <DisableWrapper className={s.content} isDisabled={isLocked}>
        <Flex
          className={s.gridWrapper}
          p="3"
          dir="column"
          jc={variant === 'full' ? 'flex-start' : 'center'}>
          <Grid cols={'6'} className={isGrid ? s.grid : ''}>
            {variant === 'full' && (
              <Flex className={isGrid ? s.info_grid : s.grid} dir="column">
                <Text s="14" lh="20" w="500">
                  {lot.type && types[lot.type] ? types[lot.type] : '-'}
                </Text>
                <Text s="12" lh="16" w="400" color="neutrals-gray-4">
                  Тип помещения
                </Text>
              </Flex>
            )}
            <Flex className={isGrid ? s.info_grid : s.grid} dir="column">
              <Text s="14" lh="20" w="500">
                {lot.housing || '-'}
              </Text>
              <Text s="12" lh="16" w="400" color="neutrals-gray-4">
                Корпус
              </Text>
            </Flex>
            <Flex className={isGrid ? s.info_grid : s.grid} dir="column">
              <Text s="14" lh="20" w="500">
                {lot.number || '-'}
              </Text>
              <Text s="12" lh="16" w="400" color="neutrals-gray-4">
                Лот
              </Text>
            </Flex>
            <Flex className={isGrid ? s.info_grid : s.grid} dir="column">
              <Text s="14" lh="20" w="500">
                {lot.area || '-'} м²
              </Text>
              <Text s="12" lh="16" w="400" color="neutrals-gray-4">
                Площадь
              </Text>
            </Flex>
            <Flex className={isGrid ? s.info_grid : s.grid} dir="column">
              <Text s="14" lh="20" w="500">
                {lot.floor || '-'} из {lot.floorsNumber || '-'}
              </Text>
              <Text s="12" lh="16" w="400" color="neutrals-gray-4">
                Этаж
              </Text>
            </Flex>
            <Flex className={isGrid ? s.info_grid : s.grid} dir="column">
              <Text s="14" lh="20" w="500">
                {price}
              </Text>
              <Text s="12" lh="16" w="400" color="neutrals-gray-4">
                {pricePerMeter}
              </Text>
            </Flex>
          </Grid>

          {variant === 'full' && (
            <Flex mt="3" g="1">
              {buttons}
              {lot.promo &&
                lot.promo?.map((p) => (
                  <Status
                    key={p.slug}
                    style={{
                      background: `rgba(${hexToRgbString(p.color)}, 0.1)`,
                      color: p.color,
                    }}
                    pre={
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STONE_API_URL}${p.icoImg}`}
                        alt="icon"
                        width={12}
                        height={12}
                      />
                    }
                    text={p.val}
                  />
                ))}
            </Flex>
          )}
        </Flex>
      </DisableWrapper>

      <Flex
        className={s.controls}
        py="3"
        pr="3"
        dir="column"
        g={variant === 'full' ? '2' : '1'}
        jc="center"
        display="flex"
        display_l={variant === 'short' ? 'none' : 'flex'}>
        {iconButtons}
      </Flex>
    </Flex>
  )
}
