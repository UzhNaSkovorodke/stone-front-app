import React, { FC } from 'react'
import Link from 'next/link'
import styles from './Cards.module.scss'
import { Icon } from 'shared/uikit/Icon'

interface INews {
  id: number
  title: string
  text: string
  button: IButton
}

interface IButton {
  text?: string
  link: string
  img?: string
}

interface INewsElementProps {
  news: INews
  newsIndex: number
}

export const CardsElement: FC<INewsElementProps> = ({ news, newsIndex }) => {
  const generateNewsIndex = (index: number): number => {
    if (index > 3) {
      index -= 3 * Math.floor(index / 4)
    }
    return index
  }

  const getBackgroundColor = (index: number): string => {
    switch (index) {
      case 2:
        return '#23262F'
      case 3:
        return '#2D2D2D'
      default:
        return '#141416'
    }
  }

  const elementStyle = {
    background: getBackgroundColor(generateNewsIndex(newsIndex + 1)),
  }

  return (
    <Link className={styles.listItem} style={elementStyle} href={news?.button?.link}>
      <div
        dangerouslySetInnerHTML={{ __html: news.title }}
        className={styles.listItem__title}></div>
      <div className={styles.listItem__note}>{news.text}</div>
      <div className={styles.listItem__icon}>
        <Icon name="arrowButton" />
      </div>
    </Link>
  )
}
