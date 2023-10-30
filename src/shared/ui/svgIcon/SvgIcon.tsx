import classes from './SvgIcon.module.scss'
import React, { FC } from 'react'

interface SvgIconPropsInterface {
  name?: string
  link?: string
  filter?: string
}

const SvgIcon: FC<SvgIconPropsInterface> = ({ name, link, filter }) => {
  return (
    <svg className={classes.svgIcon} style={{ filter: filter ? filter : 'unset' }}>
      {name && <use xlinkHref={'#' + name}></use>}
      {link && <image xlinkHref={link}></image>}
    </svg>
  )
}

export default SvgIcon
