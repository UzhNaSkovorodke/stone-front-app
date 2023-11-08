import classes from 'src/features/commercialDetailsPage/Investments/Investments.module.scss'
import PropertyService from 'shared/components/PropertyService/PropertyService'
import { useClientWidth } from 'shared/hooks/useClientWidth'
import { useMapInvestments } from 'shared/hooks/useMapInvestments'
import {
  ICommercialProjectInvestment,
  ICommercialProjectInvestmentSectionForInvestment,
} from 'shared/services/pageData/commercialProject/commercialProject.interface'
import { IDefaultColSection } from 'shared/services/pageData/default/default.interface'
import { TabButton } from 'shared/uikit/TabButton'
import {
  IBaseElement,
  IMappedInvestmentsTabsData,
  IPurposeElement,
} from 'shared/types/investments/investments'
import Image from 'next/image'
import React, { FC, useState } from 'react'

interface IInvestmentsProps {
  investments: ICommercialProjectInvestment
  openPropertyService: (isOpen: boolean) => void
}

export const Investments: FC<IInvestmentsProps> = ({ investments, openPropertyService }) => {
  const investmentsTabs: [IDefaultColSection, ICommercialProjectInvestmentSectionForInvestment] = [
    investments.forMe,
    investments.forInvestment,
  ]
  const investmentsTabsData: IMappedInvestmentsTabsData = useMapInvestments(
    investments.forMe,
    investments.forInvestment
  )

  const [contentType, setContentType] = useState<boolean>(true)

  const clientWidth: number = useClientWidth()
  const isDesktop: boolean = clientWidth >= 1440

  return (
    <div className={classes.section}>
      <div className={classes.section__list}>
        <div className={classes.block}>
          <div className={classes.block__title}>{investments.title}</div>

          <div className={classes.block__buttons}>
            {investmentsTabs &&
              investmentsTabs.map(
                (
                  invest: IDefaultColSection | ICommercialProjectInvestmentSectionForInvestment,
                  index
                ) => (
                  <div className={classes.block__button} key={invest.id}>
                    <TabButton
                      checked={index === 0 ? contentType : !contentType}
                      onChange={() => setContentType(!contentType)}
                      text={invest.title}
                      variant="2"
                      size="medium"
                      width="full"
                      type="radio"
                    />
                  </div>
                )
              )}
          </div>

          <div className={classes.block__content}>
            {contentType && (
              <div className={classes.teaserList}>
                {investmentsTabsData.firstTabData &&
                  investmentsTabsData.firstTabData.map((item: IBaseElement, index: number) => (
                    <div className={classes.teaserList__item} key={item.id}>
                      <div
                        className={
                          classes.teaser +
                          ' ' +
                          (investmentsTabsData.firstTabData &&
                          investmentsTabsData.firstTabData.length - 1 === index
                            ? classes.teaser_borderNone_mobile
                            : '')
                        }>
                        <div className={classes.teaser__content}>
                          <div className={classes.teaser__icon}>
                            <Image
                              width={isDesktop ? 40 : 24}
                              height={isDesktop ? 40 : 24}
                              src={item.svg}
                              alt="investment_icon"
                            />
                          </div>

                          <div
                            dangerouslySetInnerHTML={{ __html: item.title }}
                            className={classes.teaser__title}></div>
                        </div>

                        <div className={classes.teaser__note}>{item.note}</div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {!contentType && (
              <div className={classes.teaserListL}>
                {investmentsTabsData.secondTabData &&
                  investmentsTabsData.secondTabData.map((elem: IPurposeElement, index) => (
                    <div className={classes.teaserListL__item} key={index}>
                      <div className={classes.teaserL}>
                        <div className={classes.teaserL__title}>{elem.purposeTitle}</div>

                        <div className={classes.teaserL__list}>
                          {elem.purpose &&
                            elem.purpose.map((baseElem: IBaseElement) => (
                              <div className={classes.teaserL__item} key={baseElem.id}>
                                <div className={classes.teaserL__header}>
                                  <div className={classes.teaserL__icon}>
                                    <Image
                                      width={isDesktop ? 40 : 24}
                                      height={isDesktop ? 40 : 24}
                                      src={baseElem.svg}
                                      alt="investment_icon"
                                    />
                                  </div>
                                  <div className={classes.teaserL__text}>{baseElem.title}</div>
                                </div>

                                <div className={classes.teaserL__note}>{baseElem.note}</div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={classes.section__teaser}>
        <PropertyService
          // TODO: в будущем поменять на единый компонент из strapi
          title={'Property service'}
          text={'Профессиональная помощь в сдаче помещений в аренду и сервисы от девелопера'}
          onClick={() => openPropertyService(true)}
          modifierClassesStyle={['banner-service_style_light']}
        />
      </div>
    </div>
  )
}
