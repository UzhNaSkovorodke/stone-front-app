import React, { FC } from 'react'
import { Button } from 'shared/uikit/Button/Button'
import { IBlockDirection } from 'shared/services/pageData/main/main.interface'
import { useClientWidth } from 'shared/hooks/useClientWidth'
import { useClientHeight } from 'shared/hooks/useClientHeight'
import { Icon } from 'shared/uikit/Icon'
import cls from './Directions.module.scss'
import { IconButton } from 'shared/uikit/IconButton'

interface IBlockDirectionsProps {
  directions: IBlockDirection[]
}

export const Directions: FC<IBlockDirectionsProps> = ({ directions }) => {
  const clientWidth = useClientWidth()
  const clientHeight = useClientHeight()

  return (
    <section className="layout__section">
      <div className={cls.card_link}>
        <div
          className={[cls.card_link__item + ' ' + cls.card_link__item_1].join('')}
          style={clientWidth < 640 ? { height: `${(clientHeight - 516) / 2}` + 'px' } : {}}>
          <div className={cls.card_link__logo}>
            <div className={cls.card_link__icon}>
              <Icon name="stoneDom" />
            </div>

            <div className={cls.card_link__description}>{directions[0]?.title}</div>
          </div>

          <div className={cls.card_link__link}>
            <Button
              s_l={'large'}
              s_m={'big'}
              s_s={'big'}
              href={directions[0]?.button.link}
              className={'button_border_light'}
              variant={'whiteStroke2'}>
              {directions[0]?.button.text}
            </Button>
            <IconButton
              icon="arrowLongRight"
              href={directions[0]?.button.link}
              s="l"
              variant="whiteStroke"
            />
          </div>
        </div>

        <div
          className={[cls.card_link__item + ' ' + cls.card_link__item_2].join('')}
          style={clientWidth < 640 ? { height: `${(clientHeight - 516) / 2}` + 'px' } : {}}>
          <div className={cls.card_link__logo}>
            <div className={cls.card_link__icon}>
              <Icon name="stoneOffice" />
            </div>

            <div className={cls.card_link__description}>{directions[1]?.title}</div>
          </div>
          <div className={cls.card_link__link}>
            <Button
              s_l={'large'}
              s_m={'big'}
              s_s={'big'}
              href={directions[1]?.button.link}
              className={'button_border_light'}
              variant={'whiteStroke2'}>
              {directions[1]?.button.text}
            </Button>
            <IconButton
              icon="arrowLongRight"
              href={directions[1]?.button.link}
              s="l"
              variant="whiteStroke"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
