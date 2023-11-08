import { getCookie, setCookie } from 'cookies-next'
import { useEffect, useState } from 'react'

export const useShowSunTutorial = () => {
  const [isTutorialShowed, setIsTutorialShowed] = useState(false)

  useEffect(() => {
    const cookie = getCookie('sun_tutorial_showed')
    setIsTutorialShowed(cookie ? true : false)
  }, [])

  const handleTutorialShowed = () => {
    setIsTutorialShowed(true)
    setCookie('sun_tutorial_showed', '1', {
      maxAge: 600000,
    })
  }

  return { isTutorialShowed, handleTutorialShowed }
}
