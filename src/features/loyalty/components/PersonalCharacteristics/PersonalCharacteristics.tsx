import { Box } from 'shared/uikit/Box'
import s from './PersonalCharacteristics.module.scss'
import { Grid } from 'shared/uikit/Grid'
import Image from 'next/image'
import { ICharacteristics } from 'src/features/loyalty/types/types'
import { Text } from 'shared/uikit/Text'

export const PersonalCharacteristics = ({
  characteristics,
  conditionals,
  mobileTitle,
}: {
  conditionals: {
    title: string
    text: string
    percent: string
  }[]
  characteristics: ICharacteristics[]
  mobileTitle: string
}): JSX.Element => {
  return (
    <div className={s.personal_body}>
      <Box p_l={'5'} p_m={'5'} p_s={'3'} className={s.char_body}>
        <Grid cols_l={'4'} cols_m={'2'} cols_s={'1'}>
          {conditionals.map((elem, index) => {
            return (
              <div className={s.listItem} key={index}>
                <Text className={s.status}>
                  {elem.title}
                  <div className={s.imageWrapper} />
                </Text>

                <div className={s.percent_wrapper}>
                  <Text className={s.percent}>{elem.percent}</Text>
                  <Text className={s.description} html={elem.text} />
                </div>
              </div>
            )
          })}
        </Grid>
      </Box>

      <div className={s.parameter_body}>
        <Text className={s.parameter_title} html={mobileTitle} />
        <Grid cols_l={'2'} cols_m={'2'} cols_s={'1'} className={s.parameter}>
          {characteristics.map((elem, index) => {
            return (
              <div key={index} className={s.parameter_item}>
                <Image
                  className={s.parameter_icon}
                  alt={'param_icon'}
                  width={32}
                  height={32}
                  src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${elem.img.data.attributes.url}`}
                />
                <Text html={elem.title} className={s.parameter_text} />
              </div>
            )
          })}
        </Grid>
      </div>
    </div>
  )
}
