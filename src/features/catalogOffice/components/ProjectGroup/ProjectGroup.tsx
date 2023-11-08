import s from './ProjectGroup.module.scss'
import { Metro } from 'shared/components/Metro'
import { LotProject } from 'shared/types/lots'
import { Box } from 'shared/uikit/Box'
import { Button } from 'shared/uikit/Button'
import { ButtonBase } from 'shared/uikit/ButtonBase'
import { Collapse } from 'shared/uikit/Collapse'
import { Flex } from 'shared/uikit/Flex'
import { Icon } from 'shared/uikit/Icon'
import { Status } from 'shared/uikit/Status'
import { Tag } from 'shared/uikit/Tag'
import { TagStack } from 'shared/uikit/TagStack'
import { Text } from 'shared/uikit/Text'
import { withStyles } from '@bruitt/classnames'
import Image from 'next/image'

const sx = withStyles(s)

interface ProjectGroupProps {
  children?: React.ReactNode
  project: LotProject
  isOpen: boolean
  toggle: () => void
}

export const ProjectGroup = ({ project, isOpen, toggle, children }: ProjectGroupProps) => {
  const metroColors = project.metro.map((m) => m.color)
  const metroStatins = project.metro.map((m) => m.name).join(', ')
  const metroTimes = project.metro.map((m) => `${m.timeTo}${`\u00A0`}мин`).join(', ')

  const timeTo = project.features?.find((f) => f.slug === 'timeTo')
  const features = project.features?.filter((f) => f.slug !== 'timeTo') || []

  return (
    <Box py="4" px="2" p_m="5" rad="24" bgColor="neutrals-white">
      <Flex px="2" px_m="0" jc="space-between" ai="center">
        <Text s="16" lh="24" w="500" s_m="32" lh_m="40" w_m="400">
          {project.name}
        </Text>
        <Box display="none" display_m="block">
          <Button className={s.button} variant="blackStroke" s="medium" onClick={toggle}>
            <Icon className={sx(s.icon, { isOpen })} name="arrowDown" s="20" />
          </Button>
        </Box>
        <Box display="block" display_m="none">
          <ButtonBase className={s.button} onClick={toggle}>
            <Icon className={sx(s.icon, { isOpen })} name="arrowDown" s="24" />
          </ButtonBase>
        </Box>
      </Flex>
      <Collapse isOpen={isOpen}>
        <Box pt="1" pt_m="4">
          {/* Mobile */}
          <Box display="block" display_m="none" px="2">
            <div>
              <Box className={s.descItem} py="2">
                <Metro color={metroColors} name={metroStatins} time={metroTimes} />
              </Box>
              {timeTo && (
                <Flex g="1" className={s.descItem} py="2">
                  <Icon name="car" s="16" color="neutrals-gray-4" />
                  <Text s="12" lh="16" w="500">
                    {timeTo.val}
                  </Text>
                </Flex>
              )}
              <Flex g="1" className={s.descItem} py="2">
                <Icon name="time" s="16" color="neutrals-gray-4" />
                <Text s="12" lh="16" w="500">
                  Готовность {project.buildingYear}
                </Text>
              </Flex>
            </div>

            <Flex className={s.starusWrapper} w="wrap" mt="1">
              {features
                .filter((data) => data.category === 'finance')
                .map((f) => (
                  <Status
                    key={f.slug}
                    pre={
                      <Image
                        src={
                          typeof f.icoImg !== 'string'
                            ? `${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${f.icoImg.attributes.url}`
                            : `${f.icoImg}`
                        }
                        alt="icon"
                        width={12}
                        height={12}
                      />
                    }
                    variant="gray"
                    text={f.val}
                  />
                ))}
            </Flex>
          </Box>
          {/* // Mobile */}

          {/* Desktop */}
          <Flex display="none" display_m="flex" dir="column" g="4">
            <TagStack variant="button" size="medium">
              <Tag>
                <Metro color={metroColors} name={metroStatins} time={metroTimes} />
              </Tag>
              {timeTo && <Tag className={s.tagButton}>{timeTo.val}</Tag>}
              <Tag className={s.tagButton}>Готовность {project.buildingYear}</Tag>
            </TagStack>

            <TagStack variant="text" size="medium">
              {project.features
                ?.filter((f) => f.category === 'finance')
                .map((f) => (
                  <Text key={f.slug} s="14" lh="20" w="500">
                    {f.val}
                  </Text>
                ))}
            </TagStack>
          </Flex>
          {/* // Desktop */}

          <Box mt="4" mt_m="5">
            {children}
          </Box>
        </Box>
      </Collapse>
    </Box>
  )
}
