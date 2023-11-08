import s from './PressCenterListItem.module.scss'
import { Post } from 'shared/services/posts'
import { Flex } from 'shared/uikit/Flex'
import { Text } from 'shared/uikit/Text'
import Link from 'next/link'

interface PressCenterListItemProps {
  post: Post
  children?: React.ReactNode
}

export const PressCenterListItem = ({ post }: PressCenterListItemProps) => {
  const {
    attributes: { slug, title, date, source },
  } = post

  return (
    <Flex
      bgColor="neutrals-white"
      rad="16"
      dir="column"
      jc="space-between"
      p="3"
      p_m="5"
      className={s.root}>
      <Link href={`/presscenter/${slug}`} target="_blank">
        <Text s="24" lh="32" w="400" s_l="32" lh_m="40" color="neutrals-gray-2" className={s.link}>
          {title}
        </Text>
      </Link>
      <Flex g="1" ai="center">
        {source?.data?.attributes?.title && (
          <>
            <Text s="14" lh="20" w="500" color="neutrals-gray-4">
              {source.data.attributes.title}
            </Text>
            <div className={s.dot} />
          </>
        )}

        <Text s="14" lh="20" w="500" color="neutrals-gray-4">
          {formatDateString(date)}
        </Text>
      </Flex>
    </Flex>
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
