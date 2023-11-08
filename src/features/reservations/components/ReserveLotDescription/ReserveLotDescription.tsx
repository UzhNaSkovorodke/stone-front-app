import classes from './ReserveLotDescription.module.scss'
import React, { useCallback, useContext } from 'react'
import { useResponsive } from 'shared/hooks/useResponsive'
import { observer } from 'mobx-react-lite'
import { StoreContext } from 'src/store/storeContext'
import { useRouter } from 'next/router'

export const ReserveLotDescription = observer(() => {
  const isMobile = useResponsive('s')
  const lkStoreContext = useContext(StoreContext)
  const router = useRouter()
  const bedroomsCountCheck = (count: number) => {
    if (count === 1) return ' спальня'
    else if (count === 1 || count === 2 || count === 3 || count === 4) return ' спальни'
    return ' спален'
  }
  const areaCheck = (area: number) => {
    if (Number.isInteger(area)) {
      return area
    } else return area.toFixed(1)
  }
  //комм переписать на нормальный handler
  const findLot = useCallback(() => {
    if (lkStoreContext.favorites.length) {
      const filteredArr = lkStoreContext.favorites.filter(
        (elem) => elem.lotId === Number(router.query.id)
      )
      return filteredArr[0]
    }
    return null
  }, [lkStoreContext.favorites, router.query.id])

  const formatNumber = (number: string) => {
    const numb = parseInt(number).toFixed(0)
    let formatted_number = numb.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    formatted_number += ' ₽'
    return formatted_number
  }
  const lot = findLot()

  return (
    <div className={classes.root}>
      {isMobile && (
        <>
          <div className={[classes.text, classes.property].join(' ')}>Проект</div>
          <div className={classes.text}>{lot ? lot.lot.project.name : '-'}</div>
          <div className={[classes.text, classes.property].join(' ')}>Квартира</div>
          <div className={classes.text}>
            {lot ? lot.lot.bedroomsCount + bedroomsCountCheck(lot.lot.bedroomsCount) : '-'}
          </div>
          <div className={[classes.text, classes.property].join(' ')}>Стоимость</div>
          <div className={classes.text}>{lot ? formatNumber(lot.lot.sellingPrice) : '-'}</div>
          <div className={[classes.text, classes.property].join(' ')}>Площадь</div>
          <div className={classes.text}>{lot ? areaCheck(Number(lot.lot.area)) + ' м²' : '-'}</div>
          <div className={[classes.text, classes.property].join(' ')}>Этаж</div>
          <div className={classes.text}>
            {lot ? lot.lot.floor + ' из ' + lot.lot.floorsNumber : '-'}
          </div>
        </>
      )}
      {!isMobile && (
        <>
          <div className={classes.text}>{lot ? lot.lot.project.name : '-'}</div>
          <div className={classes.ellipseWrapper}>
            <div className={classes.ellipse} />
          </div>
          <div className={classes.text}>
            {lot
              ? lot.lot.bedroomsCount +
                lot.lot.bedroomsCount +
                bedroomsCountCheck(lot.lot.bedroomsCount)
              : '-'}
          </div>
          <div className={classes.ellipseWrapper}>
            <div className={classes.ellipse} />
          </div>
          <div className={classes.text}>{lot ? formatNumber(lot.lot.sellingPrice) : '-'}</div>
          <div className={classes.ellipseWrapper}>
            <div className={classes.ellipse} />
          </div>
          <div className={classes.text}>{lot ? areaCheck(Number(lot.lot.area)) + ' м²' : '-'}</div>
          <div className={classes.ellipseWrapper}>
            <div className={classes.ellipse} />
          </div>
          <div className={classes.text}>
            {lot ? 'Этаж ' + lot.lot.floor + ' из ' + lot.lot.floorsNumber : '-'}
          </div>
        </>
      )}
    </div>
  )
})
