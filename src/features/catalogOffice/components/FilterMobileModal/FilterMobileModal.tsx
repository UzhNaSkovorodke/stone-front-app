import s from './FilterMobileModal.module.scss'
import { MobileModalFooter } from 'shared/components/MobileModalFooter'
import { TopBar } from 'shared/components/TopBar'
import { Box } from 'shared/uikit/Box'
import { Button } from 'shared/uikit/Button'
import { ButtonBase } from 'shared/uikit/ButtonBase'
import { FullscreenModal } from 'shared/uikit/FullscreenModal'
import { Icon } from 'shared/uikit/Icon'
import { ReactNode } from 'react'

interface FilterMobileModalProps {
  isOpen: boolean
  onClose: () => unknown
  onClearFilter: () => unknown
  total?: number
  isNoResults: boolean
  children: ReactNode
}

export const FilterMobileModal = ({
  isOpen,
  onClose,
  onClearFilter,
  total,
  isNoResults,
  children,
}: FilterMobileModalProps) => {
  return (
    <FullscreenModal
      isOpen={isOpen}
      onClose={onClose}
      header={
        <TopBar
          controls={
            <ButtonBase
              className={s.mobileClose}
              onClick={() => {
                if (isNoResults) onClearFilter()
                onClose()
              }}>
              <Icon name="close" s="24" color="neutrals-white" />
            </ButtonBase>
          }
        />
      }
      footer={
        <MobileModalFooter variant="light" display_m="none" g="1">
          <Button className={s.modalButton} onClick={onClearFilter} variant="blackStroke" s="small">
            Сбросить
          </Button>
          <Button
            className={s.modalButton}
            variant="blackFill"
            s="small"
            onClick={onClose}
            disabled={isNoResults}>
            {isNoResults ? 'Нет результатов' : `Показать ${total} вариантов`}
          </Button>
        </MobileModalFooter>
      }>
      <Box className={s.mobileFilterWrapper} p="4">
        {children}
      </Box>
    </FullscreenModal>
  )
}
