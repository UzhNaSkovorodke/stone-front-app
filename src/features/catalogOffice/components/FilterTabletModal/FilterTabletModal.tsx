import s from './FilterTabletModal.module.scss'
import { Button } from 'shared/uikit/Button'
import { Flex } from 'shared/uikit/Flex'
import { Modal } from 'shared/uikit/Modal'
import { ReactNode } from 'react'

interface FilterTabletModalProps {
  isOpen: boolean
  onClose: () => unknown
  onClearFilter: () => unknown
  total?: number
  isNoResults: boolean
  children: ReactNode
}

export const FilterTabletModal = ({
  isOpen,
  onClose,
  onClearFilter,
  total,
  isNoResults,
  children,
}: FilterTabletModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {children}
      <Flex mt="4" jc="space-between">
        <Button className={s.modalButton} onClick={onClearFilter} variant="blackStroke" s="medium">
          Сбросить
        </Button>
        <Button
          className={s.modalButton}
          variant="blackFill"
          s="medium"
          onClick={onClose}
          disabled={isNoResults}>
          {isNoResults ? 'Нет результатов' : `Показать ${total} вариантов`}
        </Button>
      </Flex>
    </Modal>
  )
}
