import useMatchMedia from '../../../../shared/hooks/useMatchMedia'
import { Tabs } from '../../../../shared/uikit/Tabs'
import { PlanViewModal } from '../PlanViewModal'
import s from './PlanView.module.scss'
import { Compass } from 'shared/components/Compass'
import { ImageZoomPan } from 'shared/components/ImageZoomPan'
import { Sun } from 'shared/components/Sun'
import { SunTutorialOverlay } from 'shared/components/SunTutorialOverlay'
import { useModal } from 'shared/hooks/useModal'
import { usePlanImageState } from 'shared/hooks/usePlanImageState'
import { useResponsive } from 'shared/hooks/useResponsive'
import { useShowSunTutorial } from 'shared/hooks/useShowSunTutorial'
import { LotCardGeo, LotCardPromo } from 'shared/types/lotCard'
import { Box } from 'shared/uikit/Box'
import { Flex } from 'shared/uikit/Flex'
import { IconButton } from 'shared/uikit/IconButton'
import { TabButton } from 'shared/uikit/TabButton'
import { Text } from 'shared/uikit/Text'
import { hexToRgbString } from 'shared/utils/hexToRgbString'
import { withStyles } from '@bruitt/classnames'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { Popover as TinyPopover } from 'react-tiny-popover'
import { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch'

interface PlanViewProps {
  masterPlanImage: string | null
  floorPlanImage: string | null
  geo: LotCardGeo | null
  lotNumber: string | null
  azimuthAngle: number | null
  popularLot?: LotCardPromo
  children?: React.ReactNode
}

const sx = withStyles(s)

export const PlanView = ({
  geo,
  lotNumber,
  azimuthAngle,
  masterPlanImage,
  floorPlanImage,
  popularLot,
}: PlanViewProps) => {
  const isDimensionS = useResponsive('s')
  const isTablet = useMatchMedia('(min-width: 600px) and (max-width: 1023px)')

  const { isTutorialShowed, handleTutorialShowed } = useShowSunTutorial()

  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useModal(false)
  const { isOpen: isSunOpen, open: openSun, close: closeSun } = useModal(false)
  const {
    isOpen: isSunTutorialOpen,
    open: openSunTutorial,
    close: closeSunTutorial,
  } = useModal(false)

  const { isMasterPlanSelected, handleSelectFloorPlan, handleSelectMasterPlan } = usePlanImageState(
    { floorPlanImage }
  )

  const [isLinkCopiedPopoverOpen, setIsLinkCopiedPopoverOpen] = useState(false)

  const zoomPanRef = useRef<ReactZoomPanPinchRef>(null)

  const handleClickSunIcon = () => {
    if (isSunOpen) {
      closeSun()
      if (zoomPanRef.current) {
        zoomPanRef.current.resetTransform()
      }
    } else {
      if (zoomPanRef.current) {
        zoomPanRef.current.zoomOut(1000)
      }
      openSun()

      if (!isTutorialShowed) {
        openSunTutorial()
        handleTutorialShowed()
        setTimeout(() => {
          closeSunTutorial()
        }, 5000)
      }
    }
  }

  const handleClickFullscreenIcon = () => {
    closeSun()
    openModal()
  }

  // @TODO Вынести в хук ImageZoomPan
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

  const handleClickShare = async () => {
    await navigator.clipboard.writeText(location.href)
    setIsLinkCopiedPopoverOpen(true)
    setTimeout(() => {
      setIsLinkCopiedPopoverOpen(false)
    }, 2000)
  }

  const image = isMasterPlanSelected ? masterPlanImage : floorPlanImage
  return (
    <Box p="2" p_m="5" className={s.root}>
      <Flex ai="flex-start" jc="space-between" mb="2" dir={isDimensionS ? 'row-reverse' : 'row'}>
        {azimuthAngle && (
          <IconButton
            className={sx(s.sunIcon, { isSunOpen })}
            icon={isSunOpen ? 'brightnessUpFilled' : 'brightnessUp'}
            s={isDimensionS ? 's' : 'l'}
            variant="grayStroke"
            onClick={handleClickSunIcon}
          />
        )}

        {!isSunOpen ? (
          isDimensionS ? (
            <Flex g="1">
              {Boolean(floorPlanImage) && (
                <TabButton
                  checked={!isMasterPlanSelected}
                  onChange={handleSelectFloorPlan}
                  text="План этажа"
                  size="small"
                />
              )}

              {Boolean(masterPlanImage) && (
                <TabButton
                  checked={isMasterPlanSelected}
                  onChange={handleSelectMasterPlan}
                  text="Ген. план"
                  size="small"
                />
              )}
            </Flex>
          ) : (
            <Tabs>
              {Boolean(floorPlanImage) && (
                <Tabs.Item checked={!isMasterPlanSelected} onChange={handleSelectFloorPlan} key={1}>
                  План этажа
                </Tabs.Item>
              )}
              {Boolean(masterPlanImage) && (
                <Tabs.Item checked={isMasterPlanSelected} onChange={handleSelectMasterPlan} key={2}>
                  Ген. план
                </Tabs.Item>
              )}
            </Tabs>
          )
        ) : null}

        {!isDimensionS && !isMasterPlanSelected && (
          <Compass rotation={azimuthAngle ? azimuthAngle : 0} />
        )}
        {!isDimensionS && isMasterPlanSelected && <Box className={s.emptyCompass} />}
      </Flex>

      <Box className={s.imageContainer}>
        {isDimensionS && image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`${image}`} alt="alt" className={sx(s.imagePreviewMobile, { isSunOpen })} />
        ) : (
          <Box className={s.imageZoomPanWrapper}>
            {image && (
              <ImageZoomPan
                className={s.imageZoomPan}
                // @ts-ignore
                ref={zoomPanRef}
                src={`${image}`}
                isControlsHidden={isSunOpen}
                minScale={0.5}
                renderControls={() => (
                  <Flex
                    display="none"
                    display_m="flex"
                    dir="column"
                    g="1"
                    jc="center"
                    className={s.imageZoomPanControls}>
                    <IconButton onClick={handleZoomIn} icon="plus" variant="grayStroke" />
                    <IconButton onClick={handleZoomOut} icon="minus" variant="grayStroke" />
                  </Flex>
                )}
              />
            )}
          </Box>
        )}
        {isSunOpen && azimuthAngle && (
          <Box className={s.sunContainer} onClick={closeSunTutorial}>
            <Sun
              azimuth={azimuthAngle}
              lat={geo?.lat || null}
              lon={geo?.long || null}
              size={isTablet ? 'm' : isDimensionS ? 's' : 'l'}
            />
          </Box>
        )}
      </Box>

      <Flex jc="space-between" mt="2" mt_m="8" ai="center">
        {isDimensionS && popularLot ? (
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
        ) : (
          <Text s="12" lh="16" w="400" color="neutrals-gray-4">
            Лот {lotNumber}
          </Text>
        )}

        <Flex g="1" g_m="2">
          <TinyPopover
            isOpen={isLinkCopiedPopoverOpen}
            positions={['top']}
            padding={8}
            content={
              <Box px="2" py="1" bgColor="neutrals-gray-3" className={s.linkCopiedPopoverContent}>
                <Text s="12" lh="16" color="neutrals-white">
                  Ссылка скопирована
                </Text>
              </Box>
            }>
            <IconButton
              onClick={handleClickShare}
              icon="share"
              s={isDimensionS ? 's' : 'l'}
              variant="grayStroke"
            />
          </TinyPopover>
          <IconButton
            icon="fullscreen"
            s={isDimensionS ? 's' : 'l'}
            onClick={handleClickFullscreenIcon}
            variant="grayStroke"
          />
        </Flex>
      </Flex>

      <PlanViewModal
        isOpen={isModalOpen}
        onClose={closeModal}
        geo={geo}
        imageSrc={`${image}`}
        isMasterPlan={Boolean(masterPlanImage)}
        isMasterPlanSelected={isMasterPlanSelected}
        onSelectFloorPlan={handleSelectFloorPlan}
        onSelectMasterPlan={handleSelectMasterPlan}
        azimuthAngle={azimuthAngle}
      />
      <SunTutorialOverlay isOpen={isSunTutorialOpen} onClose={closeSunTutorial} />
    </Box>
  )
}
