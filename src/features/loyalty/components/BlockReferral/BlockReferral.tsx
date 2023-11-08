import s from './BlockRefferal.module.scss'
import { Flex } from 'shared/uikit/Flex'
import { IBlockReferrer } from 'src/features/loyalty/types/types'
import { Button } from 'shared/uikit/Button'
import Image from 'next/image'
import { Text } from 'shared/uikit/Text'

export const BlockReferral = ({ blockReferral }: { blockReferral: IBlockReferrer }) => {
  return (
    <section className={s.body}>
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
        pr_s={'4'}>
        <div className={s.number}>2</div>
        <h2 className={s.title} dangerouslySetInnerHTML={{ __html: blockReferral.title }} />
        <Text
          mb_l={'6'}
          mb_m={'6'}
          mb_s={'5'}
          className={s.description}
          html={blockReferral.text}
        />

        <Flex
          p_l={'8'}
          p_m={'5'}
          p_s={'4'}
          jc_l={'space-between'}
          dir_l={'row'}
          dir_m={'row'}
          dir_s={'column'}
          className={s.recommendation}>
          <div className={s.recommendation_content}>
            <Text html={blockReferral.headerBtn.title} className={s.recommendation_title} />
            <Text html={blockReferral.headerBtn.text} className={s.recommendation_text} />
            {blockReferral.steps.map((elem, index) => {
              return (
                <div className={s.step} key={index}>
                  <div className={s.step_index}>{index + 1}</div>
                  <Text className={s.step_text}>{elem.text}</Text>
                </div>
              )
            })}
            <Button
              href={blockReferral.headerBtn.button.link}
              variant={'whiteFill'}
              s_l={'large'}
              s_m={'medium'}
              className={s.recommendation_btn}>
              {blockReferral.headerBtn.button.text}
            </Button>
          </div>
          <div className={s.recommendation_image}>
            <Image
              quality={'100'}
              src={`${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${blockReferral.img.img.data.attributes.url}`}
              width={'220'}
              height={'291'}
              priority={true}
              alt={'изображение карты stone value'}
            />
            <div className={s.image_blur} />
            <Text html={blockReferral.img.title} className={s.image_description} />
          </div>
        </Flex>
      </Flex>
    </section>
  )
}
