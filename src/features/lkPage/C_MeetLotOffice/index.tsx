import classNames from 'classnames'
import React, { useState, useContext, Dispatch, SetStateAction } from 'react'
import classes from './style.module.scss'
import { LotOffice } from 'shared/components/LotOffice'
import { IconButton } from 'shared/uikit/IconButton'
import { ClearEventPanel } from '../ClearEventPanel'
import { Button } from 'shared/uikit/Button'
import {
  IFavorites,
  IMeetings,
  IReservations,
  ISelections,
} from 'src/store/types/lkStore.interface'
import { Icon } from 'shared/uikit/Icon'
import { StoreContext } from 'src/store/storeContext'
import { useClientWidth } from 'shared/hooks/useClientWidth'
import { useRouter } from 'next/router'
import { getStringDate, getStringTime, getTomorrowDate } from 'shared/utils/formatDate'

export default function C_MeetLotOffice({
  reserv,
  elem,
  activeMenu,
  onClickLayoutModal,
  onClickHandler,
  typeContent,
}: {
  elem: IReservations | IFavorites | ISelections | IMeetings
  activeMenu: string
  reserv: Dispatch<SetStateAction<boolean>>
  typeContent: 'DOM' | 'OFFICE'
  onClickLayoutModal: any
  onClickHandler: () => void
}) {
  const router = useRouter()
  const clientWidth = useClientWidth()
  const mobileWidth = clientWidth < 1024

  const [isClearModal, setIsClearModal] = useState<boolean>(false)

  const lkStoreContext = useContext(StoreContext)

  const cancelMeet = async () => {
    setIsClearModal(false)
  }

  const btnsArray = (
    menu: string,
    elem: IReservations | IMeetings | ISelections | IFavorites,
    func: () => void,
    setClearModal: () => React.ReactNode
  ) => {
    let btns: React.ReactNode[] = []
    switch (menu) {
      case 'Избранное':
        btns = [
          typeContent === 'DOM' ? (
            <Button
              key={menu + 'dom1'}
              s="small"
              variant="blackFill"
              width={mobileWidth ? 'full' : 'auto'}
              onClick={() => router.push(`/lk/reservations/${(elem as IFavorites).lotId}`)}>
              {mobileWidth ? `Бронь` : `Забронировать`}
            </Button>
          ) : null,
          <Button
            key={menu + 'dom2'}
            s="small"
            variant={typeContent === 'OFFICE' ? 'blackFill' : 'blackStroke'}
            width={mobileWidth ? 'full' : 'auto'}
            onClick={onClickHandler}>
            {mobileWidth ? `Встреча` : `Записаться на встречу`}
          </Button>,
        ]
        break

      case 'Подборки':
        btns = [
          (elem as IReservations).reservedDt ? (
            <Button
              key={elem + '2'}
              s="small"
              variant="blackStroke2"
              width={mobileWidth ? 'full' : 'auto'}
              post={<Icon s="12" name="lock" />}>
              <span>
                Бронь до {getTomorrowDate((elem as IReservations).reservedDt, classes.tomorrowDate)}
              </span>
            </Button>
          ) : (
            <Button
              key={menu + '22'}
              s="small"
              variant="blackFill"
              width={mobileWidth ? 'full' : 'auto'}
              onClick={() => router.push(`/lk/reservations/${(elem as IReservations).lotId}`)}>
              {mobileWidth ? `Бронь` : `Забронировать`}
            </Button>
          ),
        ]
        break

      case 'Мои встречи':
        ;(elem as IMeetings).status === 4
          ? (btns = [
              <Button
                key={elem + '3'}
                s="small"
                width={mobileWidth ? 'full' : 'auto'}
                variant="blackFill">
                {mobileWidth ? `Бронь` : `Забронировать`}
              </Button>,
            ])
          : (elem as IMeetings).status === 3
          ? (btns = [
              <Button
                key={elem + '6'}
                s="small"
                width={mobileWidth ? 'full' : 'auto'}
                variant="blackFill"
                onClick={onClickHandler}>
                {mobileWidth ? `Встреча` : `Записаться на встречу`}
              </Button>,
            ])
          : (btns = [
              <Button
                key={elem + '4'}
                s="small"
                width={mobileWidth ? 'full' : 'auto'}
                variant="blackStroke"
                onClick={onClickHandler}>
                Перенести
              </Button>,
              <div key={elem + '5'} className={mobileWidth ? classes.cancelWrapper : ''}>
                <Button
                  s="small"
                  variant="redFill"
                  width={mobileWidth ? 'full' : 'auto'}
                  onClick={func}>
                  Отменить
                </Button>
                {setClearModal()}
              </div>,
            ])
        break

      case 'Бронирования':
        btns = [
          <Button
            key={elem + '7'}
            s="small"
            width={mobileWidth ? 'full' : 'auto'}
            variant="blackStroke2"
            post={<Icon s="12" name="lock" />}>
            <span>
              Бронь до {getTomorrowDate((elem as IReservations).reservedDt, classes.tomorrowDate)}
            </span>
          </Button>,
        ]
        break
    }
    return btns
  }

  const setClearModal = function () {
    return (
      <>
        {isClearModal && (
          <ClearEventPanel
            first_btnText={'Да,отменить'}
            second_btnText={'Нет, оставить'}
            className={classes.cancelMeet}
            deleteEvent={cancelMeet}
            headerText={'Вы уверены, что хотите отменить встречу?'}
            wrapperClassName={classes.cancelMeet__contentWrapper}
            setIsClearModal={setIsClearModal}
          />
        )}
      </>
    )
  }

  const meetBlock = (menu: string, elem: IMeetings) => {
    switch (menu) {
      case 'Мои встречи':
        return (
          <div
            className={classNames(
              classes.meetDateWrapper,
              { [classes.meetDateWrapperGray]: elem.status === 1 },
              { [classes.meetDateWrapperGreen]: elem.status === 2 },
              { [classes.meetDateWrapperRed]: elem.status === 3 },
              { [classes.meetDateWrapperPurple]: elem.status === 4 }
            )}>
            <div className={classes.meetDate}>
              {getStringDate(elem?.startDt) + ', '}
              <span>{getStringTime(elem?.startDt)}</span>
            </div>
            <div
              className={classNames(
                classes.meetText,
                { [classes.meetTextGray]: elem.status === 1 },
                { [classes.meetTextGreen]: elem.status === 2 },
                { [classes.meetTextRed]: elem.status === 3 },
                { [classes.meetTextPurple]: elem.status === 4 }
              )}>
              {elem.status === 1
                ? 'На подтверждении'
                : elem.status === 2
                ? 'Встреча назначена'
                : elem.status === 3
                ? 'Встреча отменена'
                : 'Встреча состоялась'}
            </div>
          </div>
        )
    }
  }

  return (
    <>
      {meetBlock(activeMenu, elem as IMeetings)}
      <LotOffice
        lot={elem.lot}
        meet={activeMenu === 'Мои встречи'}
        variant="full"
        types={{
          Офисы: 1,
          'Офисные блоки': 2,
          Ритейл: 3,
          Паркинг: 4,
          Квартиры: 5,
          Пентхаусы: 6,
          Келлеры: 7,
          Апартамент: 8,
        }}
        iconButtons={[
          activeMenu === 'Избранное' ? (
            <IconButton
              key="2"
              icon="bookmarkFilled"
              className={classes.hideButton}
              onClick={() => lkStoreContext.clearFavorite(elem.lot.id)}
              s={!mobileWidth ? 'm' : 's'}
              variant="grayStroke"
            />
          ) : activeMenu === 'Подборки' ? (
            <IconButton
              key="3"
              icon="bookmark"
              className={classes.hideButton}
              onClick={() => lkStoreContext.addFavorite(elem.lot.id)}
              s={!mobileWidth ? 'm' : 's'}
              variant="grayStroke"
            />
          ) : (
            <div
              className={classNames(classes.plug, {
                [classes.desktopPlug]: !mobileWidth,
              })}
            />
          ),
          <IconButton
            key="1"
            icon="fullscreen"
            s={!mobileWidth ? 'm' : 's'}
            variant="grayStroke"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault()
              onClickLayoutModal(elem.lot)
              elem.hasOwnProperty('reservedDt') ? reserv(true) : reserv(false)
            }}
          />,
        ]}
        buttons={btnsArray(activeMenu, elem, () => setIsClearModal(true), setClearModal)}
      />
    </>
  )
}
