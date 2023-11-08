import { IDefaultBlock } from 'shared/services/pageData/default/default.interface'
import React, { FC } from 'react'
import cls from './Slogan.module.scss'

export const Slogan: FC<IDefaultBlock> = ({ text, title }) => {
  return (
    <section className="layout__section">
      <div className={cls.info}>
        <h1 className={cls.info__title} dangerouslySetInnerHTML={{ __html: title }}></h1>

        <div className={cls.info__description}>{text}</div>
      </div>
    </section>
  )
}
