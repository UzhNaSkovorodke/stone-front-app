import React, { FC, useEffect, useRef, useState } from 'react'
import classes from './SelectionRules.module.scss'
import { IBlockAdvices } from 'shared/services/pageData/investments/investments.interface'
import Image from 'next/image'
import { useClientWidth } from 'shared/hooks/useClientWidth'

export enum ETabTitle {
  OFFICE = 0,
  DOM = 1,
}

interface ISelectionRulesProps {
  changeType: (value: ETabTitle) => void
  advices: IBlockAdvices
}

export const SelectionRules: FC<ISelectionRulesProps> = ({ changeType, advices }) => {
  const [
    contentType,
    // setContentType
  ] = useState<ETabTitle>(ETabTitle.OFFICE)
  const clientWidth: number = useClientWidth()
  const isDesktop: boolean = clientWidth >= 1440
  const isMobile: boolean = clientWidth < 768

  const scrollRef = useRef<HTMLDivElement>(null)

  const getScrollStyles = (): React.CSSProperties | undefined => {
    if (isMobile) {
      if (contentType === ETabTitle.DOM) {
        return { paddingRight: 32 }
      }
      return { paddingLeft: 32 }
    }
  }

  useEffect(() => {
    changeType(contentType)

    if (isMobile && scrollRef.current) {
      if (contentType === ETabTitle.DOM) {
        scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
        return
      }
      scrollRef.current.scrollLeft = 0
    }
  }, [contentType])

  return (
    <div className={classes.block}>
      <div
        className={classes.block__title}
        dangerouslySetInnerHTML={{ __html: advices.title || '' }}></div>

      <div ref={scrollRef} className={classes.block__buttons} style={getScrollStyles()}>
        {advices.tabs &&
          advices.tabs.map(
            (
              tab
              // index
            ) => {
              if (tab.title === 'Коммерческие проекты') {
                return (
                  <div className={classes.block__button} key={tab.id}>
                    {/*комм убрал кнопку (SP-104) т.к пока что нет деления на тип комерч/жилье*/}
                    {/*<TabButton*/}
                    {/*  checked={contentType === index }*/}
                    {/*  onChange={() => setContentType(index)}*/}
                    {/*  text={tab.title}*/}
                    {/*  variant="2"*/}
                    {/*  size="medium"*/}
                    {/*  width="full"*/}
                    {/*  type="radio"*/}
                    {/*/>*/}
                    <div style={{ marginTop: '43.6px' }} />
                  </div>
                )
              }
            }
          )}
      </div>

      <div className={classes.block__content}>
        <div className={classes.teaserList}>
          {(contentType ? advices.tabs[1].col || [] : advices.tabs[0].col || []).map(
            (col, index, array) => (
              <div className={classes.teaserList__item} key={col.id}>
                <div
                  className={
                    classes.teaser +
                    ' ' +
                    (array.length - 1 === index ? classes.teaser_borderNone_mobile : '')
                  }>
                  <div className={classes.teaser__content}>
                    <div className={classes.teaser__icon}>
                      <Image
                        priority={true}
                        src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${col.img.data?.attributes.url}`}
                        height={isDesktop ? 40 : 24}
                        width={isDesktop ? 40 : 24}
                        alt={'investmentsRules'}
                      />
                    </div>

                    <div
                      dangerouslySetInnerHTML={{ __html: col.title || '' }}
                      className={classes.teaser__title}></div>
                  </div>

                  <div className={classes.teaser__note}>{col.text}</div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
