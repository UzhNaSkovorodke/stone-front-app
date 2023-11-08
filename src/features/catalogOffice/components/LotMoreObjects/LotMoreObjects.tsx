import { LotOfficeLayoutModal } from '../LotOfficeLayoutModal'
import s from './LotMoreObjects.module.scss'
import { LotOffice } from 'shared/components/LotOffice'
import { MobileModalFooter } from 'shared/components/MobileModalFooter'
import { useModal } from 'shared/hooks/useModal'
import { useResponsive } from 'shared/hooks/useResponsive'
import { LOT_STATUS, PLACEMENT_TYPES } from 'shared/services/lots'
import { Lot } from 'shared/types/lots'
import { Box } from 'shared/uikit/Box'
import { Button } from 'shared/uikit/Button'
import { Flex } from 'shared/uikit/Flex'
import { FullscreenModal } from 'shared/uikit/FullscreenModal'
import { Icon } from 'shared/uikit/Icon'
import { IconButton } from 'shared/uikit/IconButton'
import { TabButton } from 'shared/uikit/TabButton'
import { Text } from 'shared/uikit/Text'
import Link from 'next/link'
import { useState } from 'react'

interface LotMoreObjectsProps {
  parking: Lot[] | null
  recommended: Lot[] | null
  isParkingLot: boolean
  children?: React.ReactNode
  openReservation: () => void
}

export const LotMoreObjects = ({
  parking,
  recommended,
  isParkingLot,
  openReservation,
}: LotMoreObjectsProps) => {
  const [isParkingSelected, setIsParkingSelected] = useState(false)
  const lotLayoutModal = useModal(false)
  const [lotLayoutModalData, setLotLayoutModalData] = useState<Lot>()
  const handleOpenLotLayoutModal = (lot: Lot) => {
    setLotLayoutModalData(lot)
    lotLayoutModal.open()
  }

  const isMobile = useResponsive('s')
  const data = getData(recommended, parking, isParkingSelected)

  return (
    <Box py="5" px="4" p_m="4">
      <Flex jc_m="space-between" ai_m="center" dir="column" dir_m="row" g="3">
        <Text s="24" lh="32" w="400" s_m="32" lh_m="40">
          Ещё объекты
        </Text>
        {parking?.length !== 0 && recommended && !isParkingLot && (
          <Flex className={s.tabs} g="1">
            {recommended && (
              <TabButton
                checked={!parking || !isParkingSelected}
                type="radio"
                variant="2"
                size="medium"
                name="x"
                width="full"
                text="Похожие лоты"
                onChange={() => setIsParkingSelected(false)}
              />
            )}
            {!isParkingLot && (
              <TabButton
                checked={!recommended || isParkingSelected}
                type="radio"
                variant="2"
                size="medium"
                name="x"
                width="full"
                text="Паркинг"
                onChange={() => setIsParkingSelected(true)}
              />
            )}
          </Flex>
        )}
      </Flex>

      <Flex dir="column" g="2" g_m="1" mt="3" mt_m="5">
        {data?.map((lot, i) => {
          const isLocked = lot.status === LOT_STATUS.RESERVED || lot.status === LOT_STATUS.SOLD_OUT

          /*   const lotImg = lot.directions == "1" ? lot.sitPlanImg : lot.floorPlanImg*/
          return (
            <Link href={`/catalog/commercial/${lot.number}`} key={lot.id} target="_blank">
              <LotOffice
                key={i}
                lot={lot}
                types={PLACEMENT_TYPES}
                buttons={
                  <Button
                    variant="blackFill"
                    s="small"
                    disabled={isLocked}
                    post={isLocked ? <Icon name="lock" s="12" /> : null}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault()
                      if (!isLocked) openReservation()
                    }}>
                    {isLocked ? 'Забронировано' : 'Забронировать'}
                  </Button>
                }
                iconButtons={[
                  <IconButton
                    key={1}
                    variant="grayStroke"
                    icon="fullscreen"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault()
                      handleOpenLotLayoutModal(lot)
                    }}
                    s={isMobile ? 's' : 'm'}
                  />,
                  // <IconButton key={2} variant="grayStroke" icon="bookmark" s="s" />,
                ]}
              />
            </Link>
          )
        })}
      </Flex>

      <FullscreenModal
        isOpen={lotLayoutModal.isOpen}
        onClose={lotLayoutModal.close}
        footer={
          <MobileModalFooter variant="dark" display_m="none" g="1">
            <Button
              variant="whiteFill"
              s="small"
              width="full"
              onClick={() => {
                lotLayoutModal.close()
                openReservation()
              }}>
              Забронировать
            </Button>

            <Button
              className={s.linkButton}
              href={`/catalog/commercial/${lotLayoutModalData?.number}`}
              variant="whiteStroke"
              s="small"
              width="full">
              Подробнее
            </Button>
          </MobileModalFooter>
        }>
        <Box className={s.lotModalWrapper}>
          <LotOfficeLayoutModal
            onClose={lotLayoutModal.close}
            lot={lotLayoutModalData}
            toggleCallbackModal={() => {
              openReservation()
            }}
          />
        </Box>
      </FullscreenModal>
    </Box>
  )
}

const getData = (recommended: Lot[] | null, parking: Lot[] | null, isParkingSelected: boolean) => {
  if (!recommended) return parking

  if (!parking) return recommended

  return isParkingSelected ? parking : recommended
}
