import React, { FC } from 'react'
import classes from './OpeningBlock.module.scss'
import { IDefaultBlock, IDefaultCard } from 'shared/services/pageData/default/default.interface'
import { useClientWidth } from 'shared/hooks/useClientWidth'
import Image from 'next/image'

interface IOpeningBlockProps {
  header: IDefaultBlock
  cards: IDefaultCard[]
}

export const OpeningBlock: FC<IOpeningBlockProps> = ({ header, cards }) => {
  const clientWidth: number = useClientWidth()
  const isDesktop: boolean = clientWidth >= 1440

  return (
    <div className={classes.block}>
      <div
        className={classes.block__title}
        dangerouslySetInnerHTML={{ __html: header.title }}></div>
      <div
        className={classes.block__description}
        dangerouslySetInnerHTML={{ __html: header.text }}></div>

      <div className={classes.block__content}>
        <div className={classes.teaserList}>
          {cards &&
            cards.map((card: IDefaultCard, index: number) => (
              <div className={classes.teaserList__item} key={card.id}>
                <div
                  className={
                    classes.teaser +
                    ' ' +
                    (cards.length - 1 === index ? classes.teaser_borderNone_mobile : '')
                  }>
                  <div className={classes.teaser__content}>
                    <div className={classes.teaser__icon}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${card.img.data?.attributes.url}`}
                        height={isDesktop ? 40 : 24}
                        width={isDesktop ? 40 : 24}
                        alt="characteristics"
                      />
                    </div>

                    <div
                      className={classes.teaser__title}
                      dangerouslySetInnerHTML={{ __html: card.title || '' }}></div>
                  </div>

                  <div
                    className={classes.teaser__note}
                    dangerouslySetInnerHTML={{ __html: card.text || '' }}></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
