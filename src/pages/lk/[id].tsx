import S_Content from 'src/features/lkPage/S_Content'
import S_Menu from 'src/features/lkPage/S_Menu'
import { StoreContext } from 'src/store/storeContext'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef, useState } from 'react'
import classes from './style.module.scss'
import { ClearEventPanel } from 'src/features/lkPage/ClearEventPanel'
import { getAllIds } from 'src/features/lkPage/C_Content/model/groupProjectHandler'

const Lk = observer(() => {
  const lkStoreContext = useContext(StoreContext)
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState<boolean>(true)

  const deleteAllFavorites = async () => {
    await lkStoreContext.clearFavorites(getAllIds(lkStoreContext.favorites))
    setIsClearModal(false)
  }
  useEffect(() => {
    const user = localStorage.getItem('User')
    if (user === null) {
      router.push('/')
    } else {
      setIsLoaded(true)
    }

    lkStoreContext.fetchSelections()
    lkStoreContext.fetchFavorites()
    lkStoreContext.fetchMeetings()
    lkStoreContext.fetchBooking()
  }, [])

  const refMain = useRef<HTMLDivElement>(null)
  const [isMeetModal, setIsMeetModal] = useState<boolean>(false)
  const [activeMenu, setActiveMenu] = useState<string>('Избранное')
  const [isClearModal, setIsClearModal] = useState<boolean>(false)

  const cls = classNames(classes.root)

  return (
    <>
      {isLoaded ? (
        <div
          className={cls}
          ref={refMain}
          onClick={(e) => (e.target === refMain.current ? setIsMeetModal(false) : null)}>
          <Head>
            <title>Личный кабинет</title>
            <meta property="og:title" content="Stone Portal lk" key="title" />
            <meta property="og:description" content="Личный кабинет" key="description" />
            <meta property="og:site_name" content="Stonehedgecompany" key="site_name" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/image/favicon.ico" />
          </Head>
          <main className={classes.main}>
            <div className={classes.mainWrapper} id="wrap">
              <S_Menu setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
              <S_Content
                isMeetModal={isMeetModal}
                setIsMeetModal={setIsMeetModal}
                isClearModal={isClearModal}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                setIsClearModal={setIsClearModal}
              />
              {isClearModal && (
                <ClearEventPanel
                  first_btnText={'Да, очистить'}
                  second_btnText={'Нет, отменить'}
                  className={classes.clearPanel__root}
                  deleteEvent={deleteAllFavorites}
                  headerText={'Вы уверены, что хотите очистить список?'}
                  wrapperClassName={classes.clearPanel__contentWrapper}
                  setIsClearModal={setIsClearModal}
                />
              )}
            </div>
          </main>
        </div>
      ) : null}
    </>
  )
})
export default Lk
