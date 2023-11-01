import { IDefaultBlock } from 'shared/lib/pageData/default/default.interface'
import React from 'react'
import cls from './Slogan.module.scss'

export const Slogan = ({ text, title }: IDefaultBlock) => {
  return (
    <section className="layout__section">
      <div className={cls.info}>
        <h1 className={cls.info__title} dangerouslySetInnerHTML={{ __html: title }}></h1>

        <div className={cls.info__description}>{text}</div>
      </div>
    </section>
  )
}
