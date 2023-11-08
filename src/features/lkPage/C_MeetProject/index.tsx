import C_SelectContent from 'src/features/lkPage/C_SelectContent'
import { SectionsType } from 'src/store/types/lkStore.interface'
import classNames from 'classnames'
import React, { Dispatch, SetStateAction } from 'react'
import classes from './style.module.scss'
import { Metro } from 'shared/components/Metro'

export default function C_MeetProject({
  reserv,
  onClickLayoutModal,
  activeMenu,
  elem,
  onClickHandler,
  typeContent,
}: {
  activeMenu: string
  typeContent: 'DOM' | 'OFFICE'
  onClickLayoutModal: any
  elem: SectionsType
  reserv: Dispatch<SetStateAction<boolean>>
  onClickHandler: () => void
}) {
  const cls = classNames(classes.root)

  return (
    <div className={cls}>
      <div className={classes.newRoot}>
        <div className={classes.projectNameWrapper}>
          <div className={classes.headerTitle}>{elem[0].lot.project.name}</div>
          <div className={classes.metroWrapper}>
            <Metro
              name={`${elem[0]?.lot?.project?.metro.map((item: any) => item?.name).join(', ')}`}
              color={elem[0]?.lot?.project?.metro.map((item: any) => item?.color)}
              time={`${elem[0]?.lot?.project?.metro
                .map((item: any) => item?.timeTo + `${'\u00A0'}мин`)
                .join(', ')}`}
            />
          </div>
          <div className={classes.description}>Бумажный проезд, вл. 19, стр. 1</div>
        </div>
        <div className={classes.selectWrapper}>
          <C_SelectContent
            reserv={reserv}
            typeContent={typeContent}
            onClickLayoutModal={onClickLayoutModal}
            activeMenu={activeMenu}
            lots={elem}
            onClickHandler={onClickHandler}
          />
        </div>
      </div>
    </div>
  )
}
