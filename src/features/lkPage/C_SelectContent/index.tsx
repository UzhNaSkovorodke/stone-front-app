import classes from './style.module.scss'
import { SectionsType } from 'src/store/types/lkStore.interface'
import { memo, Dispatch, SetStateAction } from 'react'
import classNames from 'classnames'
import C_MeetLotOffice from '../C_MeetLotOffice'

const C_SelectContent = ({
  onClickLayoutModal,
  lots,
  reserv,
  activeMenu,
  onClickHandler,
  typeContent,
}: {
  activeMenu: string
  typeContent: 'DOM' | 'OFFICE'
  onClickLayoutModal: any
  reserv: Dispatch<SetStateAction<boolean>>
  lots: SectionsType
  onClickHandler: () => void
}) => {
  const cls = classNames(classes.root)

  return (
    <div className={cls}>
      {lots.map((elem: any, i: number) => {
        return (
          <div key={i} className={classes.lotWrapper}>
            <C_MeetLotOffice
              reserv={reserv}
              elem={elem}
              onClickLayoutModal={onClickLayoutModal}
              typeContent={typeContent}
              activeMenu={activeMenu}
              onClickHandler={onClickHandler}
            />
          </div>
        )
      })}
    </div>
  )
}

export default memo(C_SelectContent)
