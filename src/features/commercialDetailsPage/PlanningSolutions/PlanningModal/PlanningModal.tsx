import { FullscreenZoomPan } from '../ZoomPan/FullscreenZoomPan'
import s from './PlanningModal.module.scss'
import { Box } from 'shared/uikit/Box'
import { Button } from 'shared/uikit/Button'
import { Flex } from 'shared/uikit/Flex'
import { IconButton } from 'shared/uikit/IconButton'
import { Text } from 'shared/uikit/Text'

interface ILotOfficeLayoutModalProps {
  children?: React.ReactNode
  onClose: () => void
  closeModal: (value: boolean) => void
  searchProjectClick: () => void
  fixNumerical: (total: number | undefined) => string | undefined
  lotData: ILotData
}

enum EPlanningType {
  OFFICE = '1',
  OFFICE_BLOCKS = '2',
  RITEIL = '3',
  PARKING = '4',
}

export interface ILotData {
  pic: string
  areaPrice: string
  squarePrice: string
  tags: string[]
  type: string
  name: string
  lot: string
  area: string
  floor: string
  total: number | undefined
}

export const PlanningModal = ({
  closeModal,
  lotData,
  fixNumerical,
  searchProjectClick,
}: ILotOfficeLayoutModalProps) => {
  const getLotTypeName = (): string => {
    switch (lotData.type) {
      case EPlanningType.OFFICE:
        return 'Офис'
      case EPlanningType.OFFICE_BLOCKS:
        return 'Крупные лоты'
      case EPlanningType.RITEIL:
        return 'Ритейл'
      case EPlanningType.PARKING:
        return 'Паркинг'
      default:
        return ''
    }
  }

  const lotTypeName: string = getLotTypeName()
  return (
    <Flex className={s.wrapper} dir="column" dir_m="row">
      <Box className={s.imageContainer}>
        <Box className={s.imageZoomPanWrapper}>
          <FullscreenZoomPan
            src={lotData.pic}
            renderControls={({ zoomIn, zoomOut }) => (
              <Flex
                display="flex"
                dir="column"
                g="1"
                jc="center"
                className={s.imageZoomPanControls}>
                <IconButton onClick={() => zoomIn()} icon="plus" variant="grayStroke" />
                <IconButton onClick={() => zoomOut()} icon="minus" variant="grayStroke" />
              </Flex>
            )}
          />
        </Box>
      </Box>
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
              {lotData.areaPrice} ₽
            </Text>
          </Flex>
          <Text s="14" lh="20" w="500" color="neutrals-gray-4">
            {lotData.squarePrice} ₽/м²
          </Text>

          <Flex className={s.tags} mt="3" w="wrap">
            {lotData.tags &&
              lotData.tags.map((item: string, index: number) => (
                <div className={s.tag} key={index}>
                  {item}
                </div>
              ))}
          </Flex>

          <Flex mt="3" mt_m="5" mb="3" dir="column" g="2">
            <Flex jc="space-between">
              <Text s="14" lh="20" w="400" color="neutrals-gray-5">
                Тип
              </Text>
              <Text s="14" lh="20" w="400">
                {lotTypeName}
              </Text>
            </Flex>
            <Flex jc="space-between">
              <Text s="14" lh="20" w="400" color="neutrals-gray-5">
                Корпус
              </Text>
              <Text s="14" lh="20" w="400">
                {lotData.name}
              </Text>
            </Flex>
            <Flex jc="space-between">
              <Text s="14" lh="20" w="400" color="neutrals-gray-5">
                Лот{' '}
              </Text>
              <Text s="14" lh="20" w="400">
                {lotData.lot}
              </Text>
            </Flex>
            <Flex jc="space-between">
              <Text s="14" lh="20" w="400" color="neutrals-gray-5">
                Площадь
              </Text>
              <Text s="14" lh="20" w="400">
                {lotData.area} м²
              </Text>
            </Flex>
            <Flex jc="space-between">
              <Text s="14" lh="20" w="400" color="neutrals-gray-5">
                Этаж
              </Text>
              <Text s="14" lh="20" w="400">
                {lotData.floor}
              </Text>
            </Flex>
          </Flex>
        </div>

        <Flex display="flex" g="2" className={s.button}>
          <Button variant="whiteFill" width="full" onClick={searchProjectClick}>
            {fixNumerical(lotData.total)}
          </Button>
        </Flex>

        <IconButton
          className={s.closeIcon}
          variant="whiteFill"
          s="s"
          icon="close"
          onClick={() => closeModal(false)}
        />
      </Flex>
    </Flex>
  )
}
