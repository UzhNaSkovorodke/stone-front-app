import { withStyles } from '@bruitt/classnames'
import { ArrowContainer, Popover as TinyPopover } from 'react-tiny-popover'
import { useModal } from '../../hooks/useModal'
import { ButtonBase } from '../ButtonBase'
import { Icon } from '../Icon'

import s from './Popover.module.scss'

const sx = withStyles(s)

interface PopoverProps {
  render: (args: ReturnType<typeof useModal>) => JSX.Element
  content: (args: ReturnType<typeof useModal>) => JSX.Element
}

export const Popover = ({ render, content }: PopoverProps) => {
  const modal = useModal(false)

  return (
    <TinyPopover
      isOpen={modal.isOpen}
      padding={8}
      positions={['right', 'bottom', 'top', 'left']}
      align="center"
      onClickOutside={(e: MouseEvent) => {
        e.preventDefault()
        modal.close()
      }}
      containerClassName={s.container}
      content={({ position, childRect, popoverRect }) => {
        return (
          <ArrowContainer
            position={position}
            childRect={childRect}
            popoverRect={popoverRect}
            arrowColor={'transparent'}
            arrowSize={10}
            arrowClassName={sx(s.arrow, { position })}>
            <div className={sx(s.content)}>
              <ButtonBase className={s.closeButton} onClick={modal.close}>
                <Icon name="close" s="20" />
              </ButtonBase>
              {content(modal)}
            </div>
          </ArrowContainer>
        )
      }}>
      <div>{render(modal)}</div>
    </TinyPopover>
  )
}
