import React, { FC } from 'react'
import classes from './NumbersAndSlogan.module.scss'
import { IDefaultBlock } from 'shared/services/pageData/default/default.interface'

interface NumbersAndSloganProps {
  slogan: IDefaultBlock
  numbers: IDefaultBlock
}

export const NumbersAndSlogan: FC<NumbersAndSloganProps> = ({ slogan, numbers }) => {
  return (
    <div className={classes.block}>
      <div className={classes.teaser}>
        <div className={classes.teaser__title}>{numbers?.title}</div>
        <div className={classes.teaser__description}>{numbers?.text}</div>
      </div>
      <div className={`${classes.teaser} ${classes.teaser_style_bg} ${classes.teaser_style_light}`}>
        <div
          className={`${classes.teaser__title}`}
          dangerouslySetInnerHTML={{ __html: slogan.title }}></div>
      </div>
    </div>
  )
}
