import { SectionsType } from 'src/store/types/lkStore.interface'
import { StoreContext } from 'src/store/storeContext'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import C_MeetingsModal from '../C_MeetingsModal'
import classes from './style.module.scss'
import {
  getGroupArr,
  getGroupForType,
  getProjectsName,
} from 'src/features/lkPage/C_Content/model/groupProjectHandler'
import C_ProjectWrapper from '../С_ProjectWrapper'
import C_MeetProject from '../C_MeetProject'
import C_EmptyContent from '../C_EmptyContent'
import { FullscreenModal } from 'shared/uikit/FullscreenModal'
import { useModal } from 'shared/hooks/useModal'
import { Lot } from 'shared/types/lots'
import { LotOfficeLayoutModal } from 'src/features/catalogOffice/components/LotOfficeLayoutModal'
import { Box } from 'shared/uikit/Box'

const C_Content = observer(
  ({
    activeMenu,
    setActiveMenu,
    isMeetModal,
    setIsMeetModal,
    typeContent,
  }: {
    activeMenu: string
    isMeetModal: boolean
    typeContent: 'DOM' | 'OFFICE'
    setActiveMenu: Dispatch<SetStateAction<string>>
    setIsMeetModal: Dispatch<SetStateAction<boolean>>
  }) => {
    const cls = classNames(classes.root)

    const [projects, setProjects] = useState<SectionsType[]>([])
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const [isLots, setIsLots] = useState<boolean>(false)
    const lkStoreContext = useContext(StoreContext)
    let storeContext: SectionsType
    const onClickHandler = useCallback(() => {
      setIsMeetModal((prev) => !prev)
    }, [])

    useEffect(() => {
      setIsSubmit(false)
    }, [isMeetModal])

    switch (activeMenu) {
      case 'Избранное':
        storeContext = lkStoreContext.favorites
        break
      case 'Подборки':
        storeContext = lkStoreContext.selections
        break
      case 'Мои встречи':
        storeContext = lkStoreContext.meetings
        break
      case 'Бронирования':
        storeContext = lkStoreContext.booking
        break

      default:
        storeContext = lkStoreContext.favorites
        break
    }

    useEffect(() => {
      if (Array.isArray(storeContext) && storeContext[0]?.lot) {
        setIsLots(true)
        setProjects(
          getGroupArr(getProjectsName(storeContext), getGroupForType(storeContext, typeContent))
        )
      } else {
        setIsLots(false)
      }
    }, [storeContext, typeContent])

    const lotLayoutModal = useModal(false)
    const [lotLayoutModalData, setLotLayoutModalData] = useState<Lot>()
    const handleOpenLotLayoutModal = (lot: Lot) => {
      setLotLayoutModalData(lot)
      lotLayoutModal.open()
    }
    const [isReserved, setIsReserved] = useState<boolean>(false)

    if (isLots && projects[0]?.length) {
      return (
        <>
          <div className={cls}>
            {projects.map((elem, i) => {
              {
                return activeMenu !== 'Мои встречи' ? (
                  <C_ProjectWrapper
                    key={i}
                    activeMenu={activeMenu}
                    elem={elem}
                    reserv={setIsReserved}
                    onClickLayoutModal={(elem: any) => handleOpenLotLayoutModal(elem)}
                    onClickHandler={onClickHandler}
                    typeContent={typeContent}
                  />
                ) : (
                  <C_MeetProject
                    typeContent={typeContent}
                    reserv={setIsReserved}
                    key={i}
                    onClickLayoutModal={(elem: any) => handleOpenLotLayoutModal(elem)}
                    activeMenu={activeMenu}
                    elem={elem}
                    onClickHandler={onClickHandler}
                  />
                )
              }
            })}
          </div>

          <C_MeetingsModal
            setActiveMenu={setActiveMenu}
            isSubmit={isSubmit}
            isModal={isMeetModal}
            setIsModal={setIsMeetModal}
            setIsSubmit={setIsSubmit}
          />
          <FullscreenModal isOpen={lotLayoutModal.isOpen} onClose={lotLayoutModal.close}>
            <Box className={classes.lotModalWrapper}>
              <LotOfficeLayoutModal
                lk={true}
                reserv={isReserved}
                onClose={lotLayoutModal.close}
                lot={lotLayoutModalData}
              />
            </Box>
          </FullscreenModal>
        </>
      )
    }

    return (
      <div className={classNames(cls, classes.emptyRoot)}>
        <C_EmptyContent activeMenu={activeMenu} />
      </div>
    )
  }
)

export default C_Content
