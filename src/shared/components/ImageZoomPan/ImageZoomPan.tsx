import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

import s from './ImageZoomPan.module.scss'
import { ReactElement, forwardRef } from 'react'
import { Grid } from '../../uikit/Grid'
import { useResponsive } from '../../hooks/useResponsive'
import { Box } from '../../uikit/Box'
import { withStyles } from '@bruitt/classnames'

interface ImageZoomPanProps {
  src: string
  isStretched?: boolean
  renderControls?: () => ReactElement
  transformWrapperClassName?: string
  className?: string
  initialScale?: number
  minScale?: number
  isControlsHidden?: boolean
  children?: React.ReactNode
}

const sx = withStyles(s)

export const ImageZoomPan = forwardRef<HTMLDivElement, ImageZoomPanProps>(function ImageZoomPan(
  {
    src,
    renderControls,
    isControlsHidden,
    initialScale = 1,
    minScale = 1,
    className,
    transformWrapperClassName,
    isStretched,
  },
  ref
) {
  const isDimensionS = useResponsive('s')

  if (isStretched || isDimensionS) {
    return (
      <>
        <TransformWrapper
          // @ts-ignore
          ref={ref}
          centerOnInit
          initialScale={initialScale}
          minScale={minScale}
          limitToBounds
          wheel={{ disabled: true }}>
          <TransformComponent wrapperClass={sx(s.transformWrapper, transformWrapperClassName)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={src}
              className={s.image}
              onLoad={() => {
                // @ts-ignore
                ref?.current?.centerView?.(1, 0)
              }}
            />
          </TransformComponent>
        </TransformWrapper>
        {!isControlsHidden && renderControls && renderControls()}
      </>
    )
  }

  return (
    <Grid cols_m="3" className={sx(s.root, className)}>
      <Box display="none" display_m="block" />
      <TransformWrapper
        // @ts-ignore
        ref={ref}
        centerOnInit
        initialScale={initialScale}
        minScale={minScale}
        limitToBounds
        disablePadding
        wheel={{ disabled: true }}>
        <TransformComponent wrapperClass={sx(s.transformWrapper, transformWrapperClassName)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={src} className={sx(s.image)} />
        </TransformComponent>
      </TransformWrapper>
      {!isControlsHidden && renderControls && renderControls()}
    </Grid>
  )
})
