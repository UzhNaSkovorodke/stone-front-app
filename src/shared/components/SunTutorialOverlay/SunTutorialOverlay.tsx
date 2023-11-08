import s from './SunTutorialOverlay.module.scss'
import { Text } from '../../uikit/Text'
import { Flex } from '../../uikit/Flex'

interface SunTutorialOverlayProps {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}

export const SunTutorialOverlay = ({ onClose, isOpen }: SunTutorialOverlayProps) => {
  return isOpen ? (
    <Flex className={s.root} onClick={onClose} ai="center" jc="center">
      <Text
        align="center"
        className={s.tutorialText}
        s="14"
        lh="20"
        w="500"
        s_m="20"
        lh_m="32"
        w_m="400"
        color="neutrals-white">
        Двигайте солнце по&nbsp;кругу, чтобы увидеть, где оно будет находиться в&nbsp;разное время
        суток
      </Text>
    </Flex>
  ) : null
}
