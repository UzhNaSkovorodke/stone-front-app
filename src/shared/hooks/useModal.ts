import { useCallback, useState } from 'react'

export const useModal = (isOpenedByDefault: boolean) => {
  const [isOpen, setOpen] = useState(isOpenedByDefault)

  const open = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])
  const toggle = useCallback(() => setOpen((p) => !p), [])

  return {
    isOpen,
    open,
    close,
    toggle,
  }
}
