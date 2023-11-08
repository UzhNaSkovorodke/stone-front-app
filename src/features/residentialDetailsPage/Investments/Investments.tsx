import React, { FC } from 'react'
import classes from 'src/features/residentialDetailsPage/Investments/Investments.module.scss'
import { IDomBlockInvestment } from 'shared/services/pageData/domProject/domProject.interface'
import { IDefaultColSectionCol } from 'shared/services/pageData/default/default.interface'
import { useClientWidth } from 'shared/hooks/useClientWidth'
import Image from 'next/image'

interface IDomInvestmentsProps {
  investments: IDomBlockInvestment
}

export const Investments: FC<IDomInvestmentsProps> = ({ investments }) => {
  const clientWidth: number = useClientWidth()
  const isDesktop: boolean = clientWidth >= 1440

  return (
    <div className={classes.block}>
      <div className={classes.block__title}>{investments.title || ''}</div>

      <div className={classes.block__content}>
        <div className={classes.teaserList}>
          {investments.col &&
            investments.col.map((investCol: IDefaultColSectionCol, index: number) => (
              <div className={classes.teaserList__item} key={index}>
                <div
                  className={
                    classes.teaser +
                    ' ' +
                    (investments.col.length - 1 === index ? classes.teaser_borderNone_mobile : '')
                  }>
                  <div className={classes.teaser__content}>
                    <div className={classes.teaser__icon}>
                      <Image
                        width={isDesktop ? 40 : 24}
                        height={isDesktop ? 40 : 24}
                        src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${investCol.img?.data?.attributes.url}`}
                        alt="investment_icon"
                      />
                    </div>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: investCol.title || '',
                      }}
                      className={classes.teaser__title}></div>
                  </div>

                  <div className={classes.teaser__note}>{investCol.text || ''}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
