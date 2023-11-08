import { useEffect } from 'react'

export const useBlockScrollIf = (shouldBlock: boolean): void => {
  useEffect(() => {
    const enable = () => {
      document.body.classList.toggle('disable-scroll')
    }

    const disable = () => {
      document.body.classList.remove('disable-scroll')
    }

    if (shouldBlock) {
      enable()
      return disable
    }
  }, [shouldBlock])
}
