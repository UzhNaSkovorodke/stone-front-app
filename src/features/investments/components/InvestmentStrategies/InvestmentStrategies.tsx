import React, { FC } from 'react'
import classes from 'src/features/investments/components/InvestmentStrategies/InvestmentStrategies.module.scss'
import { IBlockStrategies } from 'shared/services/pageData/investments/investments.interface'

interface IInvestmentsStrategiesProps {
  strategies: IBlockStrategies
}

export const InvestmentStrategies: FC<IInvestmentsStrategiesProps> = ({ strategies }) => {
  return (
    <section className={classes.section}>
      <div className={classes.teaserList}>
        <div
          className={`${classes.teaserList__item} ${classes.teaserList__item_l} ${classes.teaserL}`}
          dangerouslySetInnerHTML={{ __html: strategies.title || '' }}></div>

        <div
          className={`${classes.teaserList__item} ${classes.teaser} ${classes.teaser_style_gray}`}>
          <div className={classes.teaser__title}>{strategies.cards[0]?.title || ''}</div>

          <div
            className={classes.teaser__description}
            dangerouslySetInnerHTML={{
              __html: strategies.cards[0]?.text || '',
            }}></div>
        </div>

        <div className={`${classes.teaserList__item} ${classes.teaser}`}>
          <div className={classes.teaser__title}>{strategies.cards[1]?.title || ''}</div>

          <div
            className={classes.teaser__description}
            dangerouslySetInnerHTML={{
              __html: strategies.cards[1]?.text || '',
            }}></div>
        </div>

        <div
          className={`${classes.teaserList__item} ${classes.teaserList__item_xl} ${classes.teaser} ${classes.teaser_style_bg}`}></div>

        <div
          className={`${classes.teaserList__item} ${classes.teaser} ${classes.teaser_style_light}`}>
          <div className={classes.teaser__title}>{strategies.cards[2]?.title}</div>

          <div
            className={classes.teaser__description}
            dangerouslySetInnerHTML={{
              __html: strategies.cards[2]?.text || '',
            }}></div>
        </div>
      </div>
    </section>
  )
}
