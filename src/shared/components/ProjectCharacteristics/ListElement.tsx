import React, { FC } from 'react'
import classes from './ProjectCharacteristics.module.scss'
import { useGenerateClasses } from 'shared/hooks/useGenerateClasses'

interface IList {
  title: string
  note: string
}

interface IListElementProps {
  item: IList
  selectedIndex: number
  index: number
  modifierClassesStyle?: string[]
}

export const ListElement: FC<IListElementProps> = ({
  item,
  selectedIndex,
  index,
  modifierClassesStyle = [''],
}) => {
  const ListElementClasses: string = useGenerateClasses(classes, modifierClassesStyle)

  const getStyleName = (index: number): string[] => {
    return index === selectedIndex ? [classes.list__item_active] : [classes.list__item]
  }

  const style: string = [[classes.list__item], getStyleName(index)].join(' ')

  return (
    <div className={`${classes.list} ${ListElementClasses}`}>
      <div className={style}>
        <div className={classes.list__title}>{item.title}</div>
        <div className={classes.list__note}>{item.note}</div>
      </div>
    </div>
  )
}
