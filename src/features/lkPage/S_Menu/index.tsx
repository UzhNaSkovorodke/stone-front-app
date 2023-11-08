import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import classes from './style.module.scss'
import Link from 'next/link'
import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import { useRouter, NextRouter } from 'next/router'
import { Button } from 'shared/uikit/Button'
import { StoreContext } from 'src/store/storeContext'
import useOutsideClick from '@rooks/use-outside-click'
import { ICON_TYPE_MAP } from 'shared/uikit/Icon'
import { Icon } from 'shared/uikit/Icon'

interface MenuItem {
  item: string
  itemSvg: keyof typeof ICON_TYPE_MAP
  itemSvgWhite: keyof typeof ICON_TYPE_MAP
  pageLink: string
  newContent: string
}

const S_Menu = observer(
  ({
    activeMenu,
    setActiveMenu,
  }: {
    activeMenu: string
    setActiveMenu: Dispatch<SetStateAction<string>>
  }) => {
    const cls = classNames(classes.root)

    const router: NextRouter = useRouter()
    const lkStoreContext = useContext(StoreContext)

    const MenuList: MenuItem[] = [
      {
        item: 'Избранное',
        itemSvg: 'favorites',
        itemSvgWhite: 'favoritesWhite',
        pageLink: '/lk/favorites',
        newContent: ``,
      },
      {
        item: 'Подборки',
        itemSvg: 'selection',
        itemSvgWhite: 'selectionWhite',
        pageLink: '/lk/selection',
        newContent: `${
          lkStoreContext.selectionsNew?.length ? lkStoreContext.selectionsNew.length : 0
        }`,
      },
      {
        item: 'Мои встречи',
        itemSvg: 'meetings',
        itemSvgWhite: 'meetingsWhite',
        pageLink: '/lk/meetings',
        newContent: `${lkStoreContext.meetingsNew?.length ? lkStoreContext.meetingsNew.length : 0}`,
      },
      {
        item: 'Бронирования',
        itemSvg: 'booking',
        itemSvgWhite: 'bookingWhite',
        pageLink: '/lk/booking',
        newContent: ``,
      },
    ]

    const [isShown, setIsShown] = useState<boolean>(false)
    const [isWhite, setIsWhite] = useState<string>('')

    const menuRef = useRef(null) as any

    function outsidePClick() {
      setIsShown(false)
    }

    useOutsideClick(menuRef, outsidePClick)

    useEffect(() => {
      MenuList.map((item) => {
        if (item?.pageLink.slice(4) === router?.query?.id) {
          setActiveMenu(item?.item)
        }
      })
    }, [router?.query?.id])

    return (
      <div ref={menuRef} className={cls}>
        <Link href="#" className={classes.logo}>
          <Icon name="logotypeWhite" />
        </Link>
        <div className={classes.burger} onClick={() => setIsShown((prev): boolean => !prev)}>
          <Icon name="burger" />
        </div>
        <div
          className={classNames(classes.contentWrapper, {
            [classes.contentWrapper_mobile]: isShown,
          })}>
          <ul className={classes.list}>
            {MenuList.map((item: MenuItem, i: number) => {
              return (
                <Link href={item?.pageLink} key={i}>
                  <li
                    className={classNames(classes.item, {
                      [classes.item_active]: item?.item === activeMenu,
                    })}
                    onClick={() => (
                      setActiveMenu(item?.item), router.push(item?.pageLink), setIsShown(false)
                    )}
                    onMouseEnter={() => setIsWhite(item?.item)}
                    onMouseLeave={() => setIsWhite('')}>
                    <div className={classes.itemSvg}>
                      <Icon
                        name={
                          item?.item === activeMenu || isWhite === item?.item
                            ? `${item?.itemSvgWhite}`
                            : `${item?.itemSvg}`
                        }
                        color="neutrals-white"
                      />
                    </div>
                    {item?.item}
                    {item?.item && item?.newContent !== '0' && item?.newContent !== '' ? (
                      <div className={classes.newContent}>
                        {item?.newContent ? item?.newContent : null}
                      </div>
                    ) : null}
                  </li>
                </Link>
              )
            })}
          </ul>
          <div className={classes.btnWrapper}>
            <div className={classes.tips}>
              Сохраняйте понравившиеся объекты жилой или коммерческой недвижимости
            </div>
            <Button
              width="full"
              s="large"
              variant="whiteStroke"
              onClick={() => router.push('/catalog/commercial')}>
              Перейти в каталог
            </Button>
            <button
              className={classes.logout}
              onClick={() => (lkStoreContext.user.handleLogout(), router.push('/'))}>
              <Icon name="exit" />
              <div>Выйти</div>
            </button>
          </div>
        </div>
      </div>
    )
  }
)
export default S_Menu
