import React, { FC, useEffect, useRef, useState } from 'react'
import classes from 'shared/components/Accordion/Accordion.module.scss'
import Image from 'next/image'
import { Icon } from 'shared/uikit/Icon'

export interface IAccordionItems {
  title: string
  svgName: string
  description: string
}

interface IAccordionProps {
  accordionItems: IAccordionItems[]
}

interface IAccordionSlideStyles {
  id: number
  height: number
}

const Accordion: FC<IAccordionProps> = ({ accordionItems }) => {
  const accordionRef = useRef<HTMLDivElement[]>([])

  const [itemRefStyle, setItemRefStyle] = useState<IAccordionSlideStyles[]>([])

  const setRef = (el: HTMLDivElement | null, index: number): void => {
    if (el) {
      accordionRef.current[index] = el
    }
  }

  const initAccordionSlides = (): void => {
    const stylesArray: IAccordionSlideStyles[] = []

    accordionItems.map((item, index) => stylesArray.push({ id: index, height: 0 }))

    setItemRefStyle(stylesArray)
  }

  const toggleItem = (index: number): void => {
    const contentHeightWrap: number =
      accordionRef.current[index].children[1].getBoundingClientRect().height
    const contentHeight: number =
      accordionRef.current[index].children[1].children[0].getBoundingClientRect().height

    setItemRefStyle(
      itemRefStyle.map((item) => {
        if (contentHeightWrap === 0) {
          return item.id === index ? { ...item, height: contentHeight } : { ...item, height: 0 }
        }

        return item.id === index ? { ...item, height: 0 } : item
      })
    )
  }

  useEffect(() => {
    initAccordionSlides()
  }, [])

  return (
    <div className={classes.accordion}>
      {accordionItems &&
        accordionItems.map((accordion, index) => {
          if (index > 0)
            return (
              <div
                key={index}
                ref={(el) => setRef(el, index)}
                onClick={() => toggleItem(index)}
                className={classes.accordion__item}>
                <div
                  className={`${classes.accordion__title} ${
                    itemRefStyle[index]?.height ? classes.isRotatedIcon : ''
                  }`}>
                  <span>{accordion.title}</span>
                  <Icon name="arrowDown" />
                </div>

                <div
                  className={classes.accordion__bodyWrap}
                  style={{ height: itemRefStyle[index]?.height }}>
                  <div className={classes.accordion__body}>
                    <div className={classes.accordion__icon}>
                      {accordion?.svgName && (
                        <Image
                          width={311}
                          height={89}
                          alt={'изображение стандарта STONE'}
                          src={accordion.svgName}
                        />
                      )}
                    </div>

                    <div className={classes.accordion__description}>{accordion.description}</div>
                  </div>
                </div>
              </div>
            )
        })}
    </div>
  )
}

export default Accordion
