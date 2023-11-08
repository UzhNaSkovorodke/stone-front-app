import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react'
import { IBlockStandards } from 'shared/services/pageData/main/main.interface'
import { Icon } from 'shared/uikit/Icon'

export const Standards: FC<IBlockStandards> = ({ title, standarts }) => {
  const itemRef1 = useRef<HTMLDivElement>(null)
  const itemRef2 = useRef<HTMLDivElement>(null)
  const itemRef3 = useRef<HTMLDivElement>(null)
  const itemRef4 = useRef<HTMLDivElement>(null)
  const itemRef5 = useRef<HTMLDivElement>(null)

  const [windowWidth, setWindowWidth] = useState<number | null>(null)

  const [itemRef1Style, setItemRef1Style] = useState<CSSProperties | undefined>(undefined)
  const [itemRef2Style, setItemRef2Style] = useState<CSSProperties | undefined>(undefined)
  const [itemRef3Style, setItemRef3Style] = useState<CSSProperties | undefined>(undefined)
  const [itemRef4Style, setItemRef4Style] = useState<CSSProperties | undefined>(undefined)
  const [itemRef5Style, setItemRef5Style] = useState<CSSProperties | undefined>(undefined)

  const resetHeight = (): void => {
    setItemRef1Style({ height: 0 })
    setItemRef2Style({ height: 0 })
    setItemRef3Style({ height: 0 })
    setItemRef4Style({ height: 0 })
    setItemRef5Style({ height: 0 })
  }

  const initHeight = (): void => {
    setItemRef1Style(undefined)
    setItemRef2Style(undefined)
    setItemRef3Style(undefined)
    setItemRef4Style(undefined)
    setItemRef5Style(undefined)
  }

  const toggleItem = (
    itemRef: any,
    itemRefStyle: React.CSSProperties | undefined,
    setItemRefStyle: React.Dispatch<React.SetStateAction<React.CSSProperties | undefined>>
  ) => {
    if (windowWidth && windowWidth < 640) {
      resetHeight()

      if (itemRefStyle?.height === 0) {
        setItemRefStyle({
          height: itemRef.current?.children[1].children[0].getBoundingClientRect().height,
        })
      } else {
        setItemRefStyle({ height: 0 })
      }
    }
  }

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    updateWindowWidth()
    window.addEventListener('resize', updateWindowWidth)
  }, [])

  useEffect(() => {
    if (windowWidth && windowWidth < 640) {
      resetHeight()
    } else {
      initHeight()
    }
  }, [windowWidth])

  return (
    <section className="layout__section">
      <div className="teaser-list">
        <div className="teaser-list__item teaser teaser_style_dark">
          <h2 className="teaser__h">{title}</h2>
        </div>

        <div
          className="teaser-list__item teaser-list__item_mobile_hide"
          style={{
            backgroundImage: 'url(/image/01_web.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}></div>

        <div
          ref={itemRef1}
          className={
            'teaser-list__item teaser teaser_style_gray' +
            (itemRef1Style?.height === 0 ? '' : ' is-open')
          }
          onClick={() => toggleItem(itemRef1, itemRef1Style, setItemRef1Style)}>
          <div className="teaser__title">
            <span>{standarts[0].title}</span>
            <Icon name="arrowDown" />
          </div>

          <div className="teaser__body-wrap" style={itemRef1Style}>
            <div className="teaser__body">
              <div className="teaser__icon teaser__icon__first teaser__icon_style_two-icons">
                <Icon name="responsibility" />
                <Icon name="responsibilityDark" />
              </div>

              <div className="teaser__description">{standarts[0].text}</div>
            </div>
          </div>
        </div>

        <div className="teaser-list__item teaser-list__item_tablet_display"></div>

        <div
          ref={itemRef2}
          className={'teaser-list__item teaser' + (itemRef2Style?.height === 0 ? '' : ' is-open')}
          onClick={() => toggleItem(itemRef2, itemRef2Style, setItemRef2Style)}>
          <div className="teaser__title">
            <span>{standarts[1].title}</span>
            <Icon name="arrowDown" />
          </div>

          <div className="teaser__body-wrap" style={itemRef2Style}>
            <div className="teaser__body">
              <div className="teaser__icon teaser__icon__second">
                <Icon name="relationshipService" />
              </div>

              <div className="teaser__description">{standarts[1].text}</div>
            </div>
          </div>
        </div>

        <div className="teaser-list__item teaser-list__item_tablet_hide"></div>

        <div
          ref={itemRef3}
          className={
            'teaser-list__item teaser teaser_style_dark' +
            (itemRef3Style?.height === 0 ? '' : ' is-open')
          }
          onClick={() => toggleItem(itemRef3, itemRef3Style, setItemRef3Style)}>
          <div className="teaser__title">
            <span>{standarts[2].title}</span>
            <Icon name="arrowDown" />
          </div>

          <div className="teaser__body-wrap" style={itemRef3Style}>
            <div className="teaser__body">
              <div className="teaser__icon teaser__icon__third teaser__icon_style_two-icons">
                <Icon name="individuality" />
                <Icon name="individualityDark" />
              </div>

              <div className="teaser__description">{standarts[2].text}</div>
            </div>
          </div>
        </div>

        <div className="teaser-list__item teaser-list__item_tablet_hide"></div>

        <div className="teaser-list__item teaser-list__item_tablet_hide"></div>

        <div className="teaser-list__item teaser-list__item_tablet_hide"></div>

        <div
          ref={itemRef4}
          className={
            'teaser-list__item teaser teaser_style_gray' +
            (itemRef4Style?.height === 0 ? '' : ' is-open')
          }
          onClick={() => toggleItem(itemRef4, itemRef4Style, setItemRef4Style)}>
          <div className="teaser__title">
            <span>{standarts[3].title}</span>
            <Icon name="arrowDown" />
          </div>

          <div className="teaser__body-wrap" style={itemRef4Style}>
            <div className="teaser__body">
              <div className="teaser__icon teaser__icon__fourth teaser__icon_style_two-icons">
                <Icon name="empathy" />
                <Icon name="empathyDark" />
              </div>

              <div className="teaser__description">{standarts[3].text}</div>
            </div>
          </div>
        </div>

        <div className="teaser-list__item teaser-list__item_tablet_display"></div>

        <div
          ref={itemRef5}
          className={
            'teaser-list__item teaser-list__item_border_none teaser' +
            (itemRef5Style?.height === 0 ? '' : ' is-open')
          }
          onClick={() => toggleItem(itemRef5, itemRef5Style, setItemRef5Style)}>
          <div className="teaser__title">
            <span>{standarts[4].title}</span>
            <Icon name="arrowDown" />
          </div>

          <div className="teaser__body-wrap" style={itemRef5Style}>
            <div className="teaser__body">
              <div className="teaser__icon teaser__icon__fifth">
                <Icon name="artConcept" />
              </div>

              <div className="teaser__description">{standarts[4].text}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="background-list background-list_space_top">
        <div
          className="background-list__item background-list__item_1"
          style={{ backgroundImage: 'url(/image/02_web.jpg)' }}></div>

        <div className="background-list__item"></div>

        <div
          className="background-list__item background-list_desktop_hide background-list__item_col_2"
          style={{ backgroundImage: 'url(/image/03_web.jpg)' }}></div>
      </div>
    </section>
  )
}
