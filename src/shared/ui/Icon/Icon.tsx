import { withStyles } from '@bruitt/classnames'
import Check2 from './icons/check2.svg'
import DirectionDown from './icons/directionDown.svg'
import DirectionUp from './icons/directionUp.svg'
import Location from './icons/location.svg'
import LocationFilled from './icons/locationFilled.svg'
import ArrowLeft from './icons/arrowLeft.svg'
import ArrowRight from './icons/arrowRight.svg'
import ArrowUp from './icons/arrowUp.svg'
import ArrowDown from './icons/arrowDown.svg'
import ArrowLongLeft from './icons/arrowLongLeft.svg'
import ArrowLongRight from './icons/arrowLongRight.svg'
import ArrowLongUp from './icons/arrowLongUp.svg'
import ArrowLongDown from './icons/arrowLongDown.svg'
import Close from './icons/close.svg'
import CalendarWhite from './icons/calendarWhite.svg'
import Info from './icons/info.svg'
import InfoFilled from './icons/infoFilled.svg'
import User from './icons/user.svg'
import User2 from './icons/user2.svg'
import Burger from './icons/burger.svg'
import Bookmark from './icons/bookmark.svg'
import BookmarkFilled from './icons/bookmarkFilled.svg'
import Arrows from './icons/arrows.svg'
import Settings from './icons/settings.svg'
import SettingsFilled from './icons/settingsFilled.svg'
import Search from './icons/search.svg'
import LockedFilled from './icons/lockedFilled.svg'
import Car from './icons/car.svg'
import Time from './icons/time.svg'
import Lightning from './icons/lightning.svg'
import LightningFilled from './icons/lightningFilled.svg'
import Lock from './icons/lock.svg'
import LockFilled from './icons/lockFilled.svg'
import LockWhite from './icons/lockWhite.svg'
import Fullscreen from './icons/fullscreen.svg'
import Plus from './icons/plus.svg'
import Minus from './icons/minus.svg'
import Exit from './icons/exit.svg'
import BrightnessUp from './icons/brightnessUp.svg'
import BrightnessUpFilled from './icons/brightnessUpFilled.svg'
import Share from './icons/share.svg'
import Calculator from './icons/calculator.svg'
import Calculator2 from './icons/calculator2.svg'
import Calendar from './icons/calendar.svg'
import Building from './icons/building.svg'
import Briefcase from './icons/briefcase.svg'
import List from './icons/list.svg'
import Brush from './icons/brush.svg'
import Spinner from './icons/spinner.svg'
import Phone from './icons/phone.svg'
import Callback from './icons/callback.svg'
import Whatsapp from './icons/whatsapp.svg'
import Telegram from './icons/telegram.svg'
import PieWhite from './icons/pieWhite.svg'
import { IconSizesProps } from '../../lib/types/icons'
import { ColorProps } from '../../lib/types/colors'

import s from './Icon.module.scss'

const sx = withStyles(s)

interface IconProps extends IconSizesProps, ColorProps {
  name: IconName
  className?: string
}

export const Icon = ({ className, name, ...rest }: IconProps) => {
  const Component = ICON_TYPE_MAP[name]

  return <Component className={sx(className, rest)} />
}

export type IconName = keyof typeof ICON_TYPE_MAP

export const ICON_TYPE_MAP = {
  close: Close,
  check2: Check2,
  directionDown: DirectionDown,
  directionUp: DirectionUp,
  location: Location,
  locationFilled: LocationFilled,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  arrowLongLeft: ArrowLongLeft,
  arrowLongRight: ArrowLongRight,
  arrowLongUp: ArrowLongUp,
  arrowLongDown: ArrowLongDown,
  info: Info,
  exit: Exit,
  infoFilled: InfoFilled,
  user: User,
  user2: User2,
  burger: Burger,
  bookmark: Bookmark,
  bookmarkFilled: BookmarkFilled,
  arrows: Arrows,
  settings: Settings,
  settingsFilled: SettingsFilled,
  search: Search,
  lockedFilled: LockedFilled,
  car: Car,
  calendarWhite: CalendarWhite,
  time: Time,
  lightning: Lightning,
  lightningFilled: LightningFilled,
  lock: Lock,
  lock_white: LockWhite,
  lockFilled: LockFilled,
  fullscreen: Fullscreen,
  plus: Plus,
  minus: Minus,
  brightnessUp: BrightnessUp,
  brightnessUpFilled: BrightnessUpFilled,
  share: Share,
  calculator: Calculator,
  calculator2: Calculator2,
  calendar: Calendar,
  building: Building,
  briefcase: Briefcase,
  list: List,
  brush: Brush,
  spinner: Spinner,
  phone: Phone,
  callback: Callback,
  whatsapp: Whatsapp,
  telegram: Telegram,
  pieWhite: PieWhite,
} as const
