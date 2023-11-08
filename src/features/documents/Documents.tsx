import React, { FC, useState } from 'react'
import { useRouter } from 'next/router'
import classes from './Documents.module.scss'
import { Select } from 'shared/uikit/Select'
import { BaseOption } from 'shared/uikit/Select/types'
import { IDocumentsResponse } from 'shared/services/pageData/documents/documents.interface'

interface ISlugs {
  label: string
  value: string
}

interface IDocumentsProps {
  document: IDocumentsResponse
  title: string
  slugs: ISlugs[]
  id: string
}

export const Documents: FC<IDocumentsProps> = ({ document, title, slugs, id }) => {
  const [value, setValue] = useState<BaseOption<any>>(
    slugs.find((item) => {
      return item.value === id
    })
  )

  const router = useRouter()

  const handleChange = (option: BaseOption<any>) => {
    setValue(option)

    router.push('/documents/' + option.value)
  }

  return (
    <div className={classes.section}>
      <div className={classes.section__header}>
        <div className={classes.section__title}>{title}</div>
        <div className={classes.section__select}>
          <Select
            s_m="medium"
            s_l="large"
            isMulti={false}
            variant="whiteFill"
            options={slugs}
            value={value}
            onChange={handleChange}
          />
        </div>
      </div>
      <div
        className={classes.section__body}
        dangerouslySetInnerHTML={{ __html: document.text }}></div>
    </div>
  )
}
