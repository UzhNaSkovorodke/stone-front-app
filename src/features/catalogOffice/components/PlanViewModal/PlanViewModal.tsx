import useMatchMedia from '../../../../shared/hooks/useMatchMedia'
import { Tabs } from '../../../../shared/uikit/Tabs'
import s from './PlanViewModal.module.scss'
import { Compass } from 'shared/components/Compass'
import { ImageZoomPan } from 'shared/components/ImageZoomPan'
import { Sun } from 'shared/components/Sun'
import { SunTutorialOverlay } from 'shared/components/SunTutorialOverlay'
import { useModal } from 'shared/hooks/useModal'
import { useResponsive } from 'shared/hooks/useResponsive'
import { useShowSunTutorial } from 'shared/hooks/useShowSunTutorial'
import { LotCardGeo } from 'shared/types/lotCard'
import { Box } from 'shared/uikit/Box'
import { Flex } from 'shared/uikit/Flex'
import { FullscreenModal, FullscreenModalProps } from 'shared/uikit/FullscreenModal'
import { IconButton } from 'shared/uikit/IconButton'
import { useRef } from 'react'
import { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch'
import { withStyles } from '@bruitt/classnames'

interface PlanViewModalProps extends FullscreenModalProps {
  geo: LotCardGeo | null
  imageSrc: string
  azimuthAngle: number | null
  isMasterPlanSelected: boolean
  onSelectFloorPlan: () => void
  onSelectMasterPlan: () => void
  children?: React.ReactNode
  isMasterPlan: boolean
}

const sx = withStyles(s)

export const PlanViewModal = ({
  isOpen,
  onClose,
  imageSrc,
  isMasterPlan,
  geo,
  azimuthAngle,
  isMasterPlanSelected,
  onSelectFloorPlan,
  onSelectMasterPlan,
}: PlanViewModalProps) => {
  const isDimensionS = useResponsive('s')
  const isDimensionL = useResponsive('l')
  const isTablet = useMatchMedia('(min-width: 600px) and (max-width: 1023px)')

  const { isTutorialShowed, handleTutorialShowed } = useShowSunTutorial()

  const { isOpen: isSunOpen, open: openSun, close: closeSun } = useModal(false)
  const {
    isOpen: isSunTutorialOpen,
    open: openSunTutorial,
    close: closeSunTutorial,
  } = useModal(false)

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

  return (
    <FullscreenModal isOpen={isOpen} onClose={onClose}>
      <Flex g="2" g_m="0" dir="column" jc="space-between" className={s.root} p="2">
        <Flex jc="space-between">
          {azimuthAngle && (
            <IconButton
              className={sx(s.sunIcon, { isSunOpen })}
              icon={isSunOpen ? 'brightnessUpFilled' : 'brightnessUp'}
              s="l"
              variant="grayStroke"
              onClick={handleClickSunIcon}
            />
          )}

          {!isSunOpen && (
            <Tabs size={isDimensionS ? 'small' : 'medium'}>
              <Tabs.Item checked={!isMasterPlanSelected} key={1} onChange={onSelectFloorPlan}>
                План этажа
              </Tabs.Item>
              {isMasterPlan && (
                <Tabs.Item checked={isMasterPlanSelected} key={2} onChange={onSelectMasterPlan}>
                  Ген. план
                </Tabs.Item>
              )}
            </Tabs>
          )}

          <IconButton icon="close" s="l" onClick={onClose} variant="grayStroke" />
        </Flex>

        <Box className={s.imageZoomPanWrapper} mb={isMasterPlanSelected ? '10' : '0'}>
          <ImageZoomPan
            className={s.imageZoomPan}
            transformWrapperClassName={s.imageZoomPanTransformWrapper}
            // @ts-ignore
            ref={zoomPanRef}
            src={imageSrc}
            isControlsHidden={isSunOpen}
            initialScale={1}
            minScale={isDimensionL ? 0.4 : 0.5}
            renderControls={() => (
              <Flex dir="column" g="1" jc="center" className={s.imageZoomPanControls}>
                <IconButton onClick={handleZoomIn} icon="plus" variant="grayStroke" />
                <IconButton onClick={handleZoomOut} icon="minus" variant="grayStroke" />
              </Flex>
            )}
          />
        </Box>

        {!isMasterPlanSelected && azimuthAngle && <Compass rotation={azimuthAngle} />}

        {isSunOpen && azimuthAngle && (
          <Box className={s.sunContainer} onClick={closeSunTutorial}>
            <Sun
              size={isTablet ? 'm' : isDimensionS ? 's' : 'l'}
              lat={geo?.lat || null}
              lon={geo?.long || null}
              azimuth={azimuthAngle}
            />
          </Box>
        )}
      </Flex>
      <SunTutorialOverlay isOpen={isSunTutorialOpen} onClose={closeSunTutorial} />
    </FullscreenModal>
  )
}
