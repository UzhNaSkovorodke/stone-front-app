import s from './BlockPersonal.module.scss'
import { Flex } from 'shared/uikit/Flex'
import { Box } from 'shared/uikit/Box'
import { Button } from 'shared/uikit/Button'
import Line from 'src/features/loyalty/components/Line/Line'
import { PersonalCharacteristics } from 'src/features/loyalty/components/PersonalCharacteristics'
import { IBlockPersonal } from 'src/features/loyalty/types/types'
import { Text } from 'shared/uikit/Text'

export const BlockPersonal = ({ blockPersonal }: { blockPersonal: IBlockPersonal }) => {
  return (
    <section className={s.personal}>
      <Flex
        dir={'column'}
        ai={'center'}
        pt={'5'}
        pb={'5'}
        pl_l={'5'}
        pl_m={'5'}
        pl_s={'4'}
        pr_l={'5'}
        pr_m={'5'}
        pr_s={'4'}
        position={'relative'}
        className={s.body}>
        <Line variant={'fromDown'} className={s.line_first} />
        <Line variant={'fromDown'} className={s.line_second} />
        <Line variant={'fromTop'} className={s.line_third} />
        <Line variant={'fromTop'} className={s.line_fourth} />
        <h2
          className={s.title}
          dangerouslySetInnerHTML={{
            __html: blockPersonal.title,
          }}
        />
        <Text className={s.number}>1</Text>
        <Text html={blockPersonal.main.title} className={s.subtitle} />
        <Box className={s.description}>{blockPersonal.main.text}</Box>
        <Button
          href={blockPersonal.main.button.link}
          className={s.btn}
          s={'medium'}
          variant={'whiteStroke'}>
          {blockPersonal.main.button.text}
        </Button>

        <PersonalCharacteristics
          mobileTitle={blockPersonal.mobTitle}
          conditionals={blockPersonal.conditionals}
          characteristics={blockPersonal.icons}
        />
      </Flex>
    </section>
  )
}
