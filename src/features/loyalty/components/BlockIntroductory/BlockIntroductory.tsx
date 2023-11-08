import s from './BlockIntroductory.module.scss'
import { Box } from 'shared/uikit/Box'
import Image from 'next/image'
import { Flex } from 'shared/uikit/Flex'
import Line from 'src/features/loyalty/components/Line/Line'
import { IBlockIntro } from 'src/features/loyalty/types/types'
import { IntroCharacteristics } from 'src/features/loyalty/components/IntroductoryCharacteristics'
import { Text } from 'shared/uikit/Text'

export const BlockIntroductory = ({ blockIntroductory }: { blockIntroductory: IBlockIntro }) => {
  return (
    <section className={s.body}>
      <Box
        mt={'5'}
        mb={'5'}
        ml_l={'5'}
        ml_m={'5'}
        ml_s={'4'}
        mr_l={'5'}
        mr_m={'5'}
        mr_s={'4'}
        position={'relative'}>
        <Line variant={'fromDown'} className={s.line_first} />
        <Line variant={'fromDown'} className={s.line_second} />
        <Line variant={'fromTop'} className={s.line_third} />
        <Line variant={'fromTop'} className={s.line_fourth} />

        <Flex
          jc_l={'center'}
          jc_m={'center'}
          jc_s={'flex-start'}
          mt_l={'10'}
          mt_m={'10'}
          mt_s={'0'}
          mb_l={'4'}
          mb_m={'4'}
          mb_s={'5'}>
          <Image
            priority={true}
            className={s.logo}
            src={'image/stone_value.svg'}
            width={314}
            height={32}
            alt={'Logo'}
          />
        </Flex>
        <Box mb_l={'15'} mb_m={'15'} mb_s={'10'}>
          <Text className={s.title} as={'h1'} html={blockIntroductory.title} />
        </Box>

        <IntroCharacteristics characteristics={blockIntroductory.icons} />
      </Box>
    </section>
  )
}
