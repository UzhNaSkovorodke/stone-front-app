import { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch'
import { ImageZoomPan } from 'shared/components/ImageZoomPan'
import { Box } from 'shared/uikit/Box'
import { Button } from 'shared/uikit/Button'
import { Flex } from 'shared/uikit/Flex'
import { IconButton } from 'shared/uikit/IconButton'
import { Text } from 'shared/uikit/Text'

import s from './LotOfficeLayoutModal.module.scss'
import { useRef } from 'react'
import { Grid } from 'shared/uikit/Grid'
import { Lot } from 'shared/types/lots'
import { formatPrice } from 'shared/utils/formatPrice'
import { PLACEMENT_TYPES } from 'shared/services/lots'
import { LotCardFeature } from 'shared/types/lotCard'
import { Icon } from 'shared/uikit/Icon'

interface LotOfficeLayoutModalProps {
  lot?: Lot
  lk?: boolean
  reserv?: boolean
  children?: React.ReactNode
  onClose: () => void
  toggleCallbackModal?: () => void
  // TODO: убрать необязательную типизацию
}

export const LotOfficeLayoutModal = ({
  reserv,
  onClose,
  lot,
  toggleCallbackModal,
}: LotOfficeLayoutModalProps) => {
  const zoomPanRef = useRef<ReactZoomPanPinchRef>(null)

  const handleZoomIn = () => {
    if (zoomPanRef.current) {
      zoomPanRef.current.zoomIn()
    }
  }
  const handleZoomOut = () => {
    if (zoomPanRef.current) {
      zoomPanRef.current.zoomOut()
    }
  }

  if (!lot) return null

  const {
    sellingPrice,
    sellingPricePerMeter,
    features,
    type,
    housing,
    number,
    area,
    floorPlanImg,
  } = lot

  const floor = (features as Array<LotCardFeature>)?.find((f) => f.slug === 'floor')
  const featuresData = (features as Array<LotCardFeature>)?.filter(
    (f) => f.slug !== 'floor' && f.slug !== 'timeTo'
  )

  return (
    <Grid className={s.wrapper} cols="1" cols_m="2">
      <Flex className={s.imgWrap}>
        <Box className={s.imageZoomPanWrapper}>
          <ImageZoomPan
            transformWrapperClassName={s.imageZoomPanTransformWrapper}
            // @ts-ignore
            ref={zoomPanRef}
            src={`${floorPlanImg}`}
            minScale={0.8}
            isStretched
            renderControls={() => (
              <Flex dir="column" g="1" jc="center" className={s.imageZoomPanControls}>
                <IconButton
                  className={s.imageZoomPanButton}
                  onClick={handleZoomIn}
                  icon="plus"
                  variant="grayStroke"
                />
                <IconButton
                  className={s.imageZoomPanButton}
                  onClick={handleZoomOut}
                  icon="minus"
                  variant="grayStroke"
                />
              </Flex>
            )}
          />
        </Box>
        <Box className={s.bookButton} display="none" display_m="block">
          <Button
            variant="blackFill"
            disabled={!!reserv}
            post={reserv ? <Icon s="12" name="lock" /> : null}
            //TODO убрать any
            onClick={(e: any) => {
              e.preventDefault()
              toggleCallbackModal ? toggleCallbackModal() : null
            }}>
            {reserv ? 'Забронировано' : 'Забронировать'}
          </Button>
        </Box>
      </Flex>
      <Flex
        className={s.descWrap}
        dir="column"
        jc="space-between"
        bgColor="neutrals-gray-1"
        p="4"
        p_m="5">
        <div>
          <Flex jc="space-between">
            <Text s="24" lh="32" w="400" s_m="32" lh_m="40">
              {formatPrice(Number(sellingPrice))}₽
            </Text>
            {/*<Box display_m="none">
              <IconButton variant="whiteFill" s="s" icon="bookmark" />
            </Box>*/}
          </Flex>
          <Text s="14" lh="20" w="500" color="neutrals-gray-4">
            {formatPrice(Number(sellingPricePerMeter))} ₽/м²
          </Text>

          <Flex className={s.tags} mt="3" w="wrap">
            {featuresData?.map(({ val }) => (
              <div className={s.tag} key={val}>
                {val}
              </div>
            ))}
          </Flex>

          <Flex mt="3" mt_m="5" dir="column" g="2">
            <Flex jc="space-between">
              <Text s="14" lh="20" w="400" color="neutrals-gray-5">
                Тип
              </Text>
              <Text s="14" lh="20" w="400">
                {type ? `${PLACEMENT_TYPES[type]}, ` : ''}
              </Text>
            </Flex>
            <Flex jc="space-between">
              <Text s="14" lh="20" w="400" color="neutrals-gray-5">
                Корпус
              </Text>
              <Text s="14" lh="20" w="400">
                {housing}
              </Text>
            </Flex>
            <Flex jc="space-between">
              <Text s="14" lh="20" w="400" color="neutrals-gray-5">
                Лот{' '}
              </Text>
              <Text s="14" lh="20" w="400">
                {number}
              </Text>
            </Flex>
            <Flex jc="space-between">
              <Text s="14" lh="20" w="400" color="neutrals-gray-5">
                Площадь
              </Text>
              <Text s="14" lh="20" w="400">
                {area} м²
              </Text>
            </Flex>
            <Flex jc="space-between">
              <Text s="14" lh="20" w="400" color="neutrals-gray-5">
                Этаж
              </Text>
              <Text s="14" lh="20" w="400">
                {floor?.val}
              </Text>
            </Flex>
          </Flex>
        </div>

        <Flex display="none" display_m="flex" g="2">
          <Button
            className={s.linkButton}
            href={`/catalog/commercial/${number}`}
            variant="whiteFill"
            width="full">
            Подробнее
          </Button>
          {/*{!lk && <IconButton className={s.bookmark} variant="whiteFill" s="l" icon="bookmark" />}*/}
        </Flex>
      </Flex>

      <IconButton
        className={s.closeIcon}
        variant="whiteFill"
        s="s"
        icon="close"
        onClick={onClose}
      />
    </Grid>
  )
}
