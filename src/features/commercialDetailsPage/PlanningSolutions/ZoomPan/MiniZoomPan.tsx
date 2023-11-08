import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import s from './MiniZoomPan.module.scss'
import { Flex } from 'shared/uikit/Flex'

interface IZoomPanProps {
  src: string
  children?: React.ReactNode
}

export const MiniZoomPan = ({ src }: IZoomPanProps) => {
  return (
    <TransformWrapper centerOnInit minScale={0.8} limitToBounds wheel={{ disabled: false }}>
      <Flex>
        <TransformComponent wrapperClass={s.transformWrapper}>
          <img src={src} alt="test" id="imgExample" width={500} height={390} />
        </TransformComponent>
      </Flex>
    </TransformWrapper>
  )
}
