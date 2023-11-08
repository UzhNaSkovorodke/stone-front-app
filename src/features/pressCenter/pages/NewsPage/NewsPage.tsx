import { Flex } from 'shared/uikit/Flex'
import { Grid } from 'shared/uikit/Grid'

import s from './NewsPage.module.scss'
import { Text } from 'shared/uikit/Text'
import { Button } from 'shared/uikit/Button'
import { Icon } from 'shared/uikit/Icon'

import { Box } from 'shared/uikit/Box'
import Link from 'next/link'
import { Post } from 'shared/services/posts'
import { FC } from 'react'
import { withStyles } from '@bruitt/classnames'
import Image from 'next/image'
import { MainLayout } from 'src/layouts/MainLayout'
import { ICommonResponse } from 'shared/services/pageData/common/common.interface'

interface NewsPageProps {
  post: Post
  common: ICommonResponse
}

const sx = withStyles(s)

export const NewsPage: FC<NewsPageProps> = ({ post, common }) => {
  const { title, date, text, img, source } = post?.attributes
  const button = post.attributes.Button
  const imageWidth = img.data.attributes.width
  const imageHeight = img.data.attributes.height

  const aspectRatio = `${imageWidth / imageHeight} / 1`

  return (
    <MainLayout common={common.data.attributes}>
      <Grid className={s.root} cols="1" cols_l="2">
        <Flex dir="column" bgColor="neutrals-gray-1" px="4" py="5" px_m="5" p_l="10">
          <div>
            <Button
              href="/presscenter"
              pre={<Icon name="arrowLeft" s="12" />}
              variant="whiteStroke"
              s="small">
              Назад
            </Button>
          </div>

          <Text className={s.title} s="24" lh="32" w="400" color="neutrals-white" mt="5">
            {title}
          </Text>

          <Flex g="1" ai="center" mt="8" mt_m="10" className={s.additionalInfo}>
            {source?.data?.attributes && (
              <>
                <Text s="14" lh="20" w="500" color="neutrals-white">
                  {source?.data?.attributes.title}
                </Text>
                <div className={s.dot} />
              </>
            )}
            <Text s="14" lh="20" w="500" color="neutrals-white">
              {formatDateString(date)}
            </Text>
          </Flex>
        </Flex>

        <Box bgColor="neutrals-white">
          <div
            className={sx(s.imageContainer, {
              isImageLoaded: Boolean(source?.data?.attributes?.img?.data?.attributes),
            })}
            style={{ aspectRatio }}>
            {source?.data?.attributes?.img?.data?.attributes && (
              <Link href={source.data.attributes.link}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={s.sourceImage}
                  src={`https://cms.stonehedgecompany.com${source.data.attributes.img.data.attributes.url}`}
                  alt={source.data.attributes.title}
                />
              </Link>
            )}
            <Image
              className={s.image}
              src={`https://cms.stonehedgecompany.com${img?.data.attributes.url}`}
              alt="news-image"
              fill
            />
          </div>

          <Box pt="5" pb="10" px="4" px_m="5">
            <div dangerouslySetInnerHTML={{ __html: text }} />
            {button && button?.link && (
              <Box mt={'3'}>
                <Link href={button?.link || './'}>
                  <Button
                    post={<Icon name="arrowRight" />}
                    variant={'blackFill'}
                    width_l={'auto'}
                    width_m={'auto'}
                    width_s={'full'}>
                    {button.text}
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      </Grid>
    </MainLayout>
  )
}

const formatDateString = (date: string) => {
  const d = new Date(date)

  if (!(d instanceof Date) || isNaN(d.getTime())) return ''

  return d.toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
