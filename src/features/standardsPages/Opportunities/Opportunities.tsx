import React, { FC } from 'react'
import classes from './Opportunities.module.scss'
import { IBlockOpportunity } from 'shared/services/pageData/standarts/standarts.interface'
import Image from 'next/image'
import { useClientWidth } from 'shared/hooks/useClientWidth'

interface IOpportunitiesProps {
  opportunities: IBlockOpportunity
}

export const Opportunities: FC<IOpportunitiesProps> = ({ opportunities }) => {
  const clientWidth: number = useClientWidth()
  const isDesktop: boolean = clientWidth >= 1440
  return (
    <div className={classes.block}>
      <div className={classes.block__title}>{opportunities.title}</div>
      <div className={classes.teaserList}>
        {opportunities.cols &&
          opportunities.cols.map((col, index) => (
            <div className={classes.teaserList__item} key={col.id}>
              <div
                className={
                  classes.teaser +
                  ' ' +
                  (opportunities.cols.length - 1 === index ? classes.teaser_borderNone_mobile : '')
                }>
                <div className={classes.teaser__content}>
                  <div className={classes.teaser__icon}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${col.img?.data?.attributes.url}`}
                      height={isDesktop ? 40 : 24}
                      width={isDesktop ? 40 : 24}
                      alt="opportunity"
                    />
                  </div>

                  <div
                    dangerouslySetInnerHTML={{ __html: col.title || '' }}
                    className={classes.teaser__title}></div>
                </div>

                <div className={classes.teaser__note}>{col.text || ''}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
