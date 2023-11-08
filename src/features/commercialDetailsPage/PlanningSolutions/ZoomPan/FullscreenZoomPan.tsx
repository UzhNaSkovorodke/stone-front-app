import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import s from './FullscreenZoomPan.module.scss'
import Image from 'next/image'
import { ReactElement } from 'react'
import { Flex } from 'shared/uikit/Flex'

interface IZoomPanProps {
  src: string
  renderControls: ({ zoomIn, zoomOut }: { zoomIn: () => void; zoomOut: () => void }) => ReactElement
  children?: React.ReactNode
}

export const FullscreenZoomPan = ({ src, renderControls }: IZoomPanProps) => {
  return (
    <TransformWrapper centerOnInit minScale={0.4} limitToBounds wheel={{ disabled: false }}>
      {({ zoomIn, zoomOut }) => (
        <Flex className={s.transformerComponent__wrap}>
          <TransformComponent
            wrapperClass={s.transformerComponent__componentWrap}
            contentClass={s.transformerComponent__component}>
            <Image
              className={s.transformerComponent__img}
              src={src}
              width={1380}
              height={638}
              alt="test"
              id="imgExample"
            />
          </TransformComponent>

          {renderControls({ zoomIn, zoomOut })}
        </Flex>
      )}
    </TransformWrapper>
  )
}
