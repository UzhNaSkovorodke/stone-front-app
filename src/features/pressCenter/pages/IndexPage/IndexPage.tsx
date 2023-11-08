import { PressCenterListItem } from '../../components/PressCenterListItem'
import s from './IndexPage.module.scss'
import { MainLayout } from 'src/layouts/MainLayout'
import { ICommonResponse } from 'shared/services/pageData/common/common.interface'
import { usePostCategories } from 'shared/queries/usePostCategories'
import { CategoryFilterItem, usePosts } from 'shared/queries/usePosts'
import { Box } from 'shared/uikit/Box'
import { Button } from 'shared/uikit/Button'
import { Flex } from 'shared/uikit/Flex'
import { Grid } from 'shared/uikit/Grid'
import { Select } from 'shared/uikit/Select'
import { Text } from 'shared/uikit/Text'
import { getDeclension } from 'shared/utils/getDeclension'
import { useEffect, useState } from 'react'

export const IndexPage = ({ common }: { common: ICommonResponse }) => {
  const { postCategories, isSuccess: isPostCategoriesSuccess } = usePostCategories()

  const [selectedCategories, setSelectedCategories] = useState<
    { value: number; label: string; slug: string }[]
  >([])

  const {
    pages,
    fetchNextPage,
    hasNextPage,
    refetch: refetchPosts,
    isFetchingNextPage,
  } = usePosts({
    selectedCategories,
  })

  const handleChangeSelectedCategories = (options: CategoryFilterItem[]) => {
    setSelectedCategories(options)
  }

  useEffect(() => {
    refetchPosts()
  }, [selectedCategories, refetchPosts])

  if (!isPostCategoriesSuccess) return null

  const categoriesDisplayValue =
    selectedCategories.length === 1
      ? selectedCategories[0].label
      : `${getDeclension(selectedCategories.length, ['Выбрана', 'Выбрано', 'Выбрано'])} ${
          selectedCategories.length
        } ${getDeclension(selectedCategories.length, ['категория', 'категории', 'категорий'])}`

  return (
    <MainLayout common={common.data.attributes}>
      <Box pb="10" className={s.root} bgColor="neutrals-gray-7">
        <Flex
          dir="column"
          ai="center"
          jc="center"
          bgColor="neutrals-gray-1"
          p="4"
          pt="10"
          pb_m="10"
          className={s.header}>
          <Text
            s="32"
            lh="40"
            w="400"
            color="neutrals-white"
            mb="3"
            mb_m="5"
            className={s.pageTitle}>
            Пресс-центр
          </Text>
          <Select<any>
            onChange={handleChangeSelectedCategories}
            isMulti
            value={selectedCategories}
            options={postCategories}
            s="medium"
            variant="whiteFill"
            className={s.select}
            multiDisplayInputValue={categoriesDisplayValue}
            placeholder="Выберите категории"
          />
        </Flex>

        <Box p="4" p_m="5">
          <Grid cols="1" cols_m="2" cols_l="3" g="2">
            {pages.map((page) =>
              page.data.map((post) => <PressCenterListItem post={post} key={post.id} />)
            )}
          </Grid>

          {hasNextPage && (
            <Flex mt="4" mt_m="10" jc="center">
              <Button
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}
                width="full"
                width_m="auto"
                s="large">
                Показать ещё
              </Button>
            </Flex>
          )}
        </Box>
      </Box>
    </MainLayout>
  )
}
