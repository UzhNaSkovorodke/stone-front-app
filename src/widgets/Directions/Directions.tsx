'use client'
import React from 'react'
import SvgIcon from 'shared/ui/svgIcon/SvgIcon'
import Button from 'shared/ui/ButtonAxbit/Button'
import ButtonRound from 'shared/ui/buttonRound/ButtonRound'
import { IBlockDirection } from 'shared/lib/pageData/main/main.interface'
import { useClientWidth } from 'shared/lib/hooks/useClientWidth'
import { useClientHeight } from 'shared/lib/hooks/useClientHeight'
import cls from './Directions.module.scss'

interface IBlockDirectionsProps {
  directions: IBlockDirection[]
}

export const Directions = ({ directions }: IBlockDirectionsProps) => {
  //TODO сделать компонент серверным
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
              <SvgIcon name="stone-dom" />
            </div>

            <div className={cls.card_link__description}>{directions[0]?.title}</div>
          </div>

          <div className={cls.card_link__link}>
            <Button
              value={directions[0]?.button.text}
              link={directions[0]?.button.link}
              modifierClassesStyle={['button_border_light']}
            />
            <ButtonRound link={directions[0]?.button.link} />
          </div>
        </div>

        <div
          className={[cls.card_link__item + ' ' + cls.card_link__item_2].join('')}
          style={clientWidth < 640 ? { height: `${(clientHeight - 516) / 2}` + 'px' } : {}}>
          <div className={cls.card_link__logo}>
            <div className={cls.card_link__icon}>
              <SvgIcon name="stone-office" />
            </div>

            <div className={cls.card_link__description}>{directions[1]?.title}</div>
          </div>
          <div className={cls.card_link__link}>
            <Button
              value={directions[1]?.button.text}
              link={directions[1]?.button.link}
              modifierClassesStyle={['button_border_light']}
            />
            <ButtonRound link={directions[1]?.button.link} />
          </div>
        </div>
      </div>
    </section>
  )
}
