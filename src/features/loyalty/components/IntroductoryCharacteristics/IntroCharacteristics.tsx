import { Box } from 'shared/uikit/Box'
import s from './IntroCharacteristics.module.scss'
import Image from 'next/image'
import { Grid } from 'shared/uikit/Grid'
import { ICharacteristics } from 'src/features/loyalty/types/types'
import { Text } from 'shared/uikit/Text'

export const IntroCharacteristics = ({
  characteristics,
}: {
  characteristics: ICharacteristics[]
}): JSX.Element => {
  return (
    <Box p_l={'8'} p_m={'5'} p_s={'3'} className={s.body}>
      <Grid cols_l={'4'} cols_m={'2'} cols_s={'1'}>
        {characteristics.map((elem, index) => {
          return (
            <div className={s.listItem} key={index}>
              <div className={s.icon}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${elem.img.data.attributes.url}`}
                  priority={true}
                  alt={`${String(elem.title)}`}
                  width={40}
                  height={40}
                />
                <div className={s.imageWrapper} />
              </div>
              <Text as={'p'} className={s.description} html={elem.title} />
            </div>
          )
        })}
      </Grid>
    </Box>
  )
}
