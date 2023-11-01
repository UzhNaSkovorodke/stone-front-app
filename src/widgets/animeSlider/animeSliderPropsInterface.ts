export default interface AnimeSliderPropsInterface {
  slides: string[]
  animationDuration?: number //ms
  delay?: number //ms, задержка между прокруткой слайда, меньше 1000 - остановить анимацию
  emitCurrentSlide: (currentSlide: number) => void
  modifierClassesStyle?: string[]
}
