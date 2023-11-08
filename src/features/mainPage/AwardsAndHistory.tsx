import React, { FC, useState } from 'react'
import { IDefaultSlide } from 'shared/services/pageData/default/default.interface'
import { IAwardsAndHistory } from 'shared/services/pageData/main/main.interface'
import { Icon } from 'shared/uikit/Icon'

export const AwardsAndHistory: FC<IAwardsAndHistory> = ({ awards, history }) => {
  const historySlide: Array<IDefaultSlide> = [...history?.slider.map((slide) => slide)]

  const transitionDuration = 500

  const [currentSlide, setCurrentSlide] = useState<number>(0)

  const chooseYear = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="layout__section">
      <div className="block-list block-list_style_switch">
        <div className="block-list__item">
          <div className="block-list__title">{awards?.title}</div>

          <div className="teaser-list teaser-list_style_bordered">
            {awards?.awards &&
              awards?.awards.map((awardItem, index) => (
                <div
                  key={awardItem.id}
                  className={
                    'teaser-list__item teaser-icon' +
                    ' ' +
                    (awards?.awards.length - 1 === index ? 'teaser-list__item_border_none' : '')
                  }>
                  <div className="teaser-icon__icon">
                    <Icon name="branch" />
                  </div>
                  <h3 className="teaser-icon__title">{awardItem?.title}</h3>
                  <div className="teaser-icon__note">{awardItem?.sub_text}</div>
                </div>
              ))}
          </div>
        </div>

        <div className="block-list__item">
          <div className="teaser-l teaser-l_style_dark">
            <h2 className="teaser-l__h">{history?.title}</h2>

            <div className="teaser-l__body-wrap">
              {historySlide.map((slide, index) => (
                <div
                  key={slide.id}
                  className={
                    'teaser-l__body teaser-l__body_switchable ' +
                    (currentSlide === index ? 'is-active' : '')
                  }
                  style={{
                    transitionProperty: 'opacity, top',
                    transitionDuration: transitionDuration + 'ms',
                    transitionDelay: currentSlide === index ? transitionDuration + 'ms' : '0ms',
                  }}>
                  <div className="teaser-l__description">{slide?.title}</div>

                  <div className="teaser-l__note">{slide?.text}</div>
                </div>
              ))}
            </div>

            <div className="teaser-l__footer">
              <div className="teaser-l__list">
                {historySlide.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={'teaser-l__item ' + (currentSlide === index ? 'is-active' : '')}
                    onClick={() => chooseYear(index)}>
                    {slide?.sub_text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
