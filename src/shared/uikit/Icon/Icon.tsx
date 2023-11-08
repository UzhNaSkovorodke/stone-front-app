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
import ActiveUser from './icons/activeUser.svg'
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
import CheckWhite from './icons/checkWhite.svg'
import Unavailable from './icons/unavailable.svg'
import BoltInCircle from './icons/boltInCircle.svg'
import Empty from './icons/empty.svg'
import Briefcase from './icons/briefcase.svg'
import List from './icons/list.svg'
import Brush from './icons/brush.svg'
import Spinner from './icons/spinner.svg'
import SpinnerWhite from './icons/spinnerWhite.svg'
import Phone from './icons/phone.svg'
import PhoneOpacity from './icons/phoneOpacity.svg'
import Callback from './icons/callback.svg'
import Whatsapp from './icons/whatsapp.svg'
import OnSale from './icons/onSale.svg'
import Telegram from './icons/telegram.svg'
import PieWhite from './icons/pieWhite.svg'
import Office from './icons/office.svg'
import Sold from './icons/sold.svg'
import SoonSale from './icons/soonSale.svg'
import Dom from './icons/dom.svg'
import Route from './icons/route.svg'
import Responsibility from './icons/responsibility.svg'
import ResponsibilityDark from './icons/responsibility_dark.svg'
import RelationshipService from './icons//relationship-service.svg'
import SettingsBlack from './icons/settings-black.svg'
import CloseCircle from './icons/close-circle.svg'
import ArtConcept from './icons/art-concept.svg'
import Empathy from './icons/empathy.svg'
import StoneOffice from './icons/stone-office.svg'
import StoneDom from './icons/stone-dom.svg'
import Meetings from './icons/meetings.svg'
import ArrowButton from './icons/arrowButton.svg'
import MeetingsWhite from './icons/meetingsWhite.svg'
import Booking from './icons/booking.svg'
import BookingWhite from './icons/bookingWhite.svg'
import EmpathyDark from './icons/empathy_dark.svg'
import Individuality from './icons/individuality.svg'
import IndividualityDark from './icons/individuality_dark.svg'
import Globe from './icons/globe.svg'
import Selection from './icons/selection.svg'
import SelectionWhite from './icons/selectionWhite.svg'
import Favorites from './icons/favorites.svg'
import FavoritesWhite from './icons/favoritesWhite.svg'
import Success from './icons/success.svg'
import Branch from './icons/branch.svg'
import LogotypeBlack from './icons/stonelogoblack.svg'
import LogotypeWhite from './icons/logotype-white.svg'
import { IconSizesProps } from '../../types/icons'
import { ColorProps } from '../../types/colors'
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
  empty: Empty,
  arrowButton: ArrowButton,
  logotypeBlack: LogotypeBlack,
  selection: Selection,
  selectionWhite: SelectionWhite,
  booking: Booking,
  bookingWhite: BookingWhite,
  meetings: Meetings,
  meetingsWhite: MeetingsWhite,
  soonSale: SoonSale,
  favorites: Favorites,
  favoritesWhite: FavoritesWhite,
  onSale: OnSale,
  boltInCircle: BoltInCircle,
  sold: Sold,
  close: Close,
  check2: Check2,
  checkWhite: CheckWhite,
  success: Success,
  unavailable: Unavailable,
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
  activeUser: ActiveUser,
  burger: Burger,
  bookmark: Bookmark,
  bookmarkFilled: BookmarkFilled,
  logotypeWhite: LogotypeWhite,
  arrows: Arrows,
  settings: Settings,
  branch: Branch,
  settingsFilled: SettingsFilled,
  settingsBlack: SettingsBlack,
  office: Office,
  dom: Dom,
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
  closeCircle: CloseCircle,
  minus: Minus,
  brightnessUp: BrightnessUp,
  brightnessUpFilled: BrightnessUpFilled,
  share: Share,
  artConcept: ArtConcept,
  responsibility: Responsibility,
  responsibilityDark: ResponsibilityDark,
  relationshipService: RelationshipService,
  route: Route,
  stoneDom: StoneDom,
  stoneOffice: StoneOffice,
  globe: Globe,
  empathy: Empathy,
  empathyDark: EmpathyDark,
  individuality: Individuality,
  individualityDark: IndividualityDark,
  calculator: Calculator,
  calculator2: Calculator2,
  calendar: Calendar,
  building: Building,
  briefcase: Briefcase,
  list: List,
  brush: Brush,
  spinner: Spinner,
  spinnerWhite: SpinnerWhite,
  phone: Phone,
  phoneOpacity: PhoneOpacity,
  callback: Callback,
  whatsapp: Whatsapp,
  telegram: Telegram,
  pieWhite: PieWhite,
} as const
