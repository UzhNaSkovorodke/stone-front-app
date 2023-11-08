import { ProjectGroup } from '../ProjectGroup'
import { LotOffice } from 'shared/components/LotOffice'
import { LotOfficeSkeleton } from 'shared/components/LotOfficeSkeleton'
import { useModal } from 'shared/hooks/useModal'
import { useResponsive } from 'shared/hooks/useResponsive'
import { useInfiniteLots } from 'shared/queries/useInfiniteLots'
import { LOT_STATUS } from 'shared/services/lots'
import { Lot, LotProject } from 'shared/types/lots'
import { Button } from 'shared/uikit/Button'
import { Flex } from 'shared/uikit/Flex'
import { Icon } from 'shared/uikit/Icon'
import { IconButton } from 'shared/uikit/IconButton'
import Link from 'next/link'
import { useEffect } from 'react'

interface ProjectCatalogProps {
  project: LotProject
  queryString: string
  sort: string
  toggleCallbackModal: () => void
  onClickLayoutModal: (lot: Lot) => void
  isInitialOpen?: boolean
}

export const ProjectCatalog = ({
  project,
  queryString,
  sort,
  toggleCallbackModal,
  onClickLayoutModal,
  isInitialOpen,
}: ProjectCatalogProps) => {
  const { isOpen, toggle, open, close } = useModal(isInitialOpen ?? false)

  const { isLoading, pages, fetchNextPage, isFetchingNextPage } = useInfiniteLots(
    `${queryString}&filter[selected]=${project.id}&sort=${sort}`,
    { enabled: isOpen }
  )
  const isMobile = useResponsive('s')

  const lots = pages.flatMap(({ data }) => data)
  const total = pages[0]?.meta.total || 0
  const types = pages[0]?.filter.type || {}
  const moreItems = total - lots.length > 5 ? '5' : total - lots.length

  useEffect(() => {
    if (isInitialOpen) open()
    else close()
  }, [isInitialOpen])

  return (
    <ProjectGroup project={project} isOpen={isOpen} toggle={toggle}>
      <Flex dir="column" g="2" g_m="1">
        {isLoading ? (
          <>
            <LotOfficeSkeleton />
            <LotOfficeSkeleton />
            <LotOfficeSkeleton />
          </>
        ) : (
          lots.map((l) => {
            const isLocked = l.status === LOT_STATUS.RESERVED || l.status === LOT_STATUS.SOLD_OUT

            return (
              <Link href={`/catalog/commercial/${l.number}`} key={l.id} target="_blank">
                <LotOffice
                  isGrid={true}
                  lot={l}
                  types={types}
                  isLocked={isLocked}
                  buttons={
                    <Button
                      variant="blackFill"
                      s="small"
                      disabled={isLocked}
                      post={isLocked ? <Icon name="lock" s="12" /> : null}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault()
                        toggleCallbackModal()
                      }}>
                      {isLocked ? 'Забронировано' : 'Забронировать'}
                    </Button>
                  }
                  iconButtons={[
                    <IconButton
                      key={1}
                      variant="grayStroke"
                      icon="fullscreen"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault()
                        onClickLayoutModal(l)
                      }}
                      s={isMobile ? 's' : 'm'}
                    />,
                    // <IconButton key={2} variant="grayStroke" icon="bookmark" s="s" />,
                  ]}
                />
              </Link>
            )
          })
        )}
      </Flex>
      {total && total > lots.length ? (
        <Flex mt="2" mt_m="5" jc="center">
          <Button
            width="full"
            width_m="auto"
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}>
            Показать еще {moreItems} вариантов
          </Button>
        </Flex>
      ) : null}
    </ProjectGroup>
  )
}
