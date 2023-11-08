import React, { FC } from 'react'
import classes from 'src/features/standardsPages/Aesthetics/Aesthetics.module.scss'
import Accordion, { IAccordionItems } from 'shared/components/Accordion/Accordion'
import { useClientWidth } from 'shared/hooks/useClientWidth'
import { ETypeContent } from 'shared/types/typeContent.enum'
import { IBlockAdvantages } from 'shared/services/pageData/standarts/standarts.interface'
import { IDefaultCard } from 'shared/services/pageData/default/default.interface'
import Image from 'next/image'

interface IAestheticsProps {
  aesthetics: IBlockAdvantages
  typeContent?: ETypeContent
}

export const Aesthetics: FC<IAestheticsProps> = ({
  aesthetics,
  typeContent = ETypeContent.DOM,
}) => {
  const clientWidth = useClientWidth()
  const isMobileView = clientWidth < 1024
  const accordionItems: IAccordionItems[] = aesthetics.advantages.map((advantage: IDefaultCard) => {
    const getSvgName = (advantage: IDefaultCard): string => {
      if (advantage.imgSm?.data)
        return `${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${advantage.imgSm?.data?.attributes.url}`
      return ''
    }
    return {
      title: advantage.title || '',
      description: advantage.text || '',
      svgName: getSvgName(advantage),
    }
  })

  return (
    <section className={classes.section}>
      <div className={classes.section__item}>
        <div className={classes.section__title}>{aesthetics.advantages[0]?.title || ''}</div>
        <div className={classes.section__description}>{aesthetics.advantages[0]?.text || ''}</div>
      </div>

      {!isMobileView && (
        <div className={classes.section__item}>
          <div className={classes.teaserList}>
            <div className={classes.teaserList__item}>
              <div className={`${classes.teaser} ${classes.teaser_style_light}`}>
                <div className={classes.teaser__header}>
                  <div className={classes.teaser__title}>
                    {aesthetics.advantages[1]?.title || ''}
                  </div>
                  <div className={classes.teaser__icon}>
                    <Image
                      width={260}
                      height={80}
                      alt={'изображение стандарта STONE'}
                      src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${aesthetics.advantages[1]?.img?.data?.attributes.url}`}
                    />
                  </div>
                </div>

                <div className={classes.teaser__description}>
                  {aesthetics.advantages[1]?.text || ''}
                </div>
              </div>
            </div>

            <div className={classes.teaserList__item}>
              <div
                className={`${classes.teaser} ${
                  typeContent === ETypeContent.DOM
                    ? classes.teaser_style_home
                    : classes.teaser_style_office
                }`}>
                <div className={classes.teaser__header}>
                  <div className={classes.teaser__title}>
                    {aesthetics.advantages[2]?.title || ''}
                  </div>
                  <div className={classes.teaser__icon}>
                    <Image
                      width={260}
                      height={80}
                      alt={'изображение стандарта STONE'}
                      src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${aesthetics.advantages[2]?.img?.data?.attributes.url}`}
                    />
                  </div>
                </div>

                <div className={classes.teaser__description}>
                  {aesthetics.advantages[2]?.text || ''}
                </div>
              </div>
            </div>

            <div className={classes.teaserList__item}>
              <div className={`${classes.teaser} ${classes.teaser_style_dark}`}>
                <div className={classes.teaser__header}>
                  <div className={classes.teaser__title}>
                    {aesthetics.advantages[3]?.title || ''}
                  </div>
                  <div className={classes.teaser__icon}>
                    <Image
                      width={260}
                      height={80}
                      alt={'изображение стандарта STONE'}
                      src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${aesthetics.advantages[3]?.img?.data?.attributes.url}`}
                    />
                  </div>
                </div>

                <div className={classes.teaser__description}>
                  {aesthetics.advantages[3]?.text || ''}
                </div>
              </div>
            </div>

            <div className={classes.teaserList__item}>
              <div className={classes.teaser}>
                <div className={classes.teaser__header}>
                  <div className={classes.teaser__title}>
                    {aesthetics.advantages[4]?.title || ''}
                  </div>
                  <div className={classes.teaser__icon}>
                    <Image
                      width={260}
                      height={80}
                      alt={'изображение стандарта STONE'}
                      src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${aesthetics.advantages[4]?.img?.data?.attributes.url}`}
                    />
                  </div>
                </div>

                <div className={classes.teaser__description}>
                  {aesthetics.advantages[4]?.text || ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isMobileView && <Accordion accordionItems={accordionItems} />}
    </section>
  )
}
