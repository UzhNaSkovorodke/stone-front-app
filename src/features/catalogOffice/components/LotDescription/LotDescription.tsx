import { withStyles } from '@bruitt/classnames'

import s from './LotDescription.module.scss'
import { Box } from 'shared/uikit/Box'
import { Flex } from 'shared/uikit/Flex'
import { Text } from 'shared/uikit/Text'
import { formatPrice } from 'shared/utils/formatPrice'
import { Icon, IconName } from 'shared/uikit/Icon'
import { useResponsive } from 'shared/hooks/useResponsive'
import { Ref, useState } from 'react'
import { Grid } from 'shared/uikit/Grid'
import { Button } from 'shared/uikit/Button'
import { PLACEMENT_TYPES } from 'shared/services/lots'
import { LotCardFeature, LotCardPromo } from 'shared/types/lotCard'
import Image from 'next/image'
import { hexToRgbString } from 'shared/utils/hexToRgbString'
import { Status } from 'shared/uikit/Status'

const sx = withStyles(s)

interface LotDescriptionProps {
  area: string | null
  discountVolume: string | null
  discountedPrice: string | null
  sellingPrice: string | null
  sellingPricePerMeter: string | null
  typeName: number | null
  features: LotCardFeature[] | null
  projectFeatures: LotCardFeature[] | null
  promo: LotCardPromo[] | null
  bookButtonRef?: Ref<HTMLButtonElement>
  isSold?: boolean
  isBooked?: boolean
  children?: React.ReactNode
  openReservation: () => void
  lotNumber: string | null
}

const DESCRIPTION_ITEMS: { iconName: IconName; text: string }[] = [
  { iconName: 'info', text: 'Этаж 10 из 25' },
  { iconName: 'info', text: '30 рабочих мест' },
  { iconName: 'info', text: 'Угловое' },
  { iconName: 'info', text: 'Столовая' },
  { iconName: 'info', text: 'Высокий трафик' },
  { iconName: 'info', text: 'Фитнесс' },
  { iconName: 'info', text: 'Конференц-зал' },
  { iconName: 'info', text: 'Под общепит' },
  { iconName: 'info', text: 'Мокрая точка' },
  { iconName: 'info', text: 'Отделка' },
  { iconName: 'info', text: 'Выход в парк' },
]

export const LotDescription = ({
  area,
  lotNumber,
  discountVolume,
  discountedPrice,
  sellingPrice,
  sellingPricePerMeter,
  typeName,
  isSold,
  isBooked,
  bookButtonRef,
  features,
  promo,
  projectFeatures,
  openReservation,
}: LotDescriptionProps) => {
  const isDimensionS = useResponsive('s')
  const isDimensionL = useResponsive('l')

  const [isDescriptionOpen, setOpenDescription] = useState(false)

  const handleOpenDescription = () => {
    setOpenDescription((curr) => !curr)
  }

  const popularLot = promo && promo.find((f) => f.slug === 'popularLot')
  const featuresData = features?.filter((f) => f.slug !== 'timeTo')

  const statuses = projectFeatures ? (
    <Flex className={s.statuses} mt="3" mt_m="0" mt_l="3">
      {projectFeatures
        .filter((f) => f.category === 'finance')
        .map(({ val, icoImg }) => {
          return (
            <Status
              key={val}
              variant="gray"
              pre={
                icoImg && (
                  <Image
                    src={
                      typeof icoImg !== 'string'
                        ? `${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${icoImg.attributes.url}`
                        : `${icoImg}`
                    }
                    alt={val}
                    width={12}
                    height={12}
                  />
                )
              }
              text={val}
            />
          )
        })}
    </Flex>
  ) : null

  const isShowPopularLot = popularLot && !isBooked && !isSold

  return (
    <Box p="4" p_m="5" className={s.root}>
      <div className={s.content}>
        {isSold ? (
          <Text s="24" lh="32" w="400" color="neutrals-gray-4" mb="2">
            Продано
          </Text>
        ) : (
          <>
            <Flex g="1">
              {discountedPrice && (
                <Text s="14" lh="20" w="500" color="neutrals-gray-5" className={s.discountPrice}>
                  {formatPrice(Number(discountedPrice))}₽
                </Text>
              )}

              {discountVolume && (
                <Text s="14" lh="20" w="400" color="secondary-red">
                  {-discountVolume}%
                </Text>
              )}
            </Flex>

            <Flex ai="center" g="2" pb="1">
              <Text
                s="24"
                lh="32"
                w="400"
                color="neutrals-gray-1"
                className={sx(s.price, { isDisabled: isBooked })}>
                {formatPrice(Number(sellingPrice))}₽
              </Text>
              <Text s="12" lh="16" w="400" color="neutrals-gray-4">
                {formatPrice(Number(sellingPricePerMeter))} ₽/м²
              </Text>

              <Flex display="none" display_m="flex" display_l="none">
                {isShowPopularLot && popularLot.icoImg && (
                  <div
                    style={{
                      background: `rgba(${hexToRgbString(popularLot.color)}, 0.1)`,
                      color: popularLot.color,
                    }}
                    key={popularLot.slug}
                    className={s.status}>
                    <Image
                      src={`${popularLot.icoImg}`}
                      alt={popularLot.val}
                      width={12}
                      height={12}
                    />
                    <span style={{ color: popularLot.color }}>{popularLot.val}</span>
                  </div>
                )}
                {statuses}
              </Flex>
            </Flex>

            {isShowPopularLot && popularLot.icoImg && (
              <Box display="none" display_l="block" mb="2">
                <div
                  style={{
                    background: `rgba(${hexToRgbString(popularLot.color)}, 0.1)`,
                    color: popularLot.color,
                  }}
                  key={popularLot.slug}
                  className={s.status}>
                  <Image src={`${popularLot.icoImg}`} alt={popularLot.val} width={12} height={12} />
                  <span style={{ color: popularLot.color }}>{popularLot.val}</span>
                </div>
              </Box>
            )}
          </>
        )}

        <Flex
          className={sx(s.officeBlock, { isDisabled: isBooked || isSold })}
          py="2"
          ai="center"
          jc="space-between">
          <Text s="16" lh="24" w="400" color="neutrals-gray-1">
            {typeName ? `${PLACEMENT_TYPES[typeName]}, ` : ''}
            {formatPrice(Number(area))} м²
          </Text>
          <Text s="12" lh="16" w="400" color="neutrals-gray-4" display_m="none">
            Лот {lotNumber ? lotNumber : 'не определен'}
          </Text>
        </Flex>

        {featuresData && featuresData.length > 0 && (
          <Grid className={sx(s.description, { isDescriptionOpen })} cols="2" cols_m="4" cols_l="2">
            {isDimensionS ? (
              <>
                {featuresData.slice(0, 4).map(({ icoImg, val }) => (
                  <DescriptionItem
                    imageSrc={
                      process.env.NEXT_PUBLIC_STONE_CMS_API_URL
                        ? process.env.NEXT_PUBLIC_STONE_CMS_API_URL + icoImg
                        : ''
                    }
                    text={val}
                    key={val}
                    isDisabled={isBooked || isSold}
                  />
                ))}
                {isDescriptionOpen &&
                  featuresData
                    .slice(4, DESCRIPTION_ITEMS.length)
                    .map(({ icoImg, val }) => (
                      <DescriptionItem
                        imageSrc={
                          process.env.NEXT_PUBLIC_STONE_CMS_API_URL
                            ? process.env.NEXT_PUBLIC_STONE_CMS_API_URL + icoImg
                            : ''
                        }
                        text={val}
                        key={val}
                        isDisabled={isBooked || isSold}
                      />
                    ))}
              </>
            ) : (
              <>
                {featuresData.map(({ icoImg, val }) => (
                  <DescriptionItem
                    imageSrc={
                      process.env.NEXT_PUBLIC_STONE_CMS_API_URL
                        ? process.env.NEXT_PUBLIC_STONE_CMS_API_URL + icoImg
                        : ''
                    }
                    text={val}
                    key={val}
                    isDisabled={isBooked || isSold}
                  />
                ))}
              </>
            )}
            {featuresData.length % 4 === 0
              ? null
              : [...Array(4 - (featuresData.length % 4))].map((_, i) => <div key={i} />)}
          </Grid>
        )}

        {isDimensionL || isDescriptionOpen ? statuses : null}

        {isDimensionL && !isSold ? (
          <Flex g="1" mt="3">
            <Button
              className={s.buttonBook}
              s="medium"
              variant="blackFill"
              disabled={isBooked}
              post={isBooked ? <Icon name="lockedFilled" s="24" /> : undefined}
              ref={bookButtonRef}
              onClick={openReservation}>
              {isBooked ? 'Забронировано' : 'Забронировать'}
            </Button>
            {/* {false && <IconButton icon="bookmark" variant="blackStroke" disabled={isBooked} />}*/}
          </Flex>
        ) : null}

        <Box display_m="none" mt="3">
          <Button
            onClick={handleOpenDescription}
            width="full"
            s="medium"
            post={<Icon name={isDescriptionOpen ? 'arrowUp' : 'arrowDown'} />}>
            {isDescriptionOpen ? 'Свернуть' : 'Все характеристики и условия'}
          </Button>
        </Box>
      </div>
    </Box>
  )
}

interface DescriptionItemProps {
  imageSrc: string
  text: string
  isDisabled?: boolean
}

export const DescriptionItem: React.FC<DescriptionItemProps> = ({ text, isDisabled }) => (
  // export const DescriptionItem: React.FC<DescriptionItemProps> = ({ imageSrc, text, isDisabled }) => (
  <Flex g="1" ai="center" py="2" className={sx(s.descriptionItem, { isDisabled })}>
    {/* <Image src={`${imageSrc}`} alt={text} width={16} height={16} /> */}
    {/* <Icon name="arrowDown" s="16" color="neutrals-gray-4" /> */}
    <Text s="12" lh="16" w="500" color="neutrals-gray-3" className={s.descriptionItemText}>
      {text}
    </Text>
  </Flex>
)
