import s from './BcDescription.module.scss'
import { MetroIcon } from 'shared/components/MetroIcon'
import { LotCardFeature, LotCardMetro } from 'shared/types/lotCard'
import { Box } from 'shared/uikit/Box'
import { Button } from 'shared/uikit/Button'
import { Flex } from 'shared/uikit/Flex'
import { Grid } from 'shared/uikit/Grid'
import { Icon } from 'shared/uikit/Icon'
import { Text } from 'shared/uikit/Text'

interface BcDescriptionProps {
  address: string
  title: string
  metro: LotCardMetro[]
  year: number
  housing: string | null
  timeTo: LotCardFeature | null
  children?: React.ReactNode
  slug: string
}

export const BcDescription = ({
  address,
  metro,
  title,
  year,
  housing,
  timeTo,
  slug,
}: BcDescriptionProps) => {
  const colors: string[] = []
  const stations: string[] = []
  const timeFrom: string[] = []

  metro.forEach((metro) => {
    colors.push(metro.color)
    stations.push(metro.name)
    timeFrom.push(`${metro.timeTo} мин`)
  })

  return (
    <Box bgColor="primary-office">
      <Grid cols="1" cols_m="2">
        <Box p="4" p_m="5">
          <Text s="24" lh="32" s_m="32" lh_m="40" w="400" color="neutrals-white">
            {title} {housing ? `– ${housing}` : ''}
          </Text>
          <Text s="12" lh="16" w="400" mt="1" className={s.address} color="neutrals-white">
            {address}
          </Text>
          <Box mt="3" mt_m="4">
            {/*комм вот тут поменять onClick на проект*/}
            <Button href={`/commercial/${slug}`} s="small" s_m="medium" variant="whiteFill">
              Подробнее
            </Button>
          </Box>
        </Box>

        <Box p="4" p_m="5" className={s.info}>
          <Flex g="1" pb="3" ai="center">
            <MetroIcon color={colors} variant="office" />
            <Text s="12" lh="16" w="500" color="neutrals-white">
              {stations.join(', ')}
            </Text>
            <Text s="12" lh="16" w="400" color="neutrals-gray-4">
              {timeFrom.join(', ')}
            </Text>
          </Flex>

          {timeTo && (
            <Flex g="1" py="3">
              <Icon s="16" name="car" color="neutrals-white" />
              <Text s="12" lh="16" w="500" color="neutrals-white">
                {timeTo.val}
              </Text>
            </Flex>
          )}

          <Flex g="1" pt="3">
            <Icon s="16" name="time" color="neutrals-white" />
            <Text s="12" lh="16" w="500" color="neutrals-white">
              Готовность {year}
            </Text>
          </Flex>
        </Box>
      </Grid>
    </Box>
  )
}
