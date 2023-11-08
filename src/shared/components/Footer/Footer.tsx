import s from './Footer.module.scss'
import { Box } from '../../uikit/Box'
import { Flex } from '../../uikit/Flex'
import { Text } from '../../uikit/Text'
import { Button } from '../../uikit/Button'
import { Icon } from '../../uikit/Icon'
import { Logo } from '../../uikit/Logo'

import HonestDevelopment from './assets/honestDevelopment.svg'
import Link from 'next/link'
import { Grid } from '../../uikit/Grid'

interface FooterProps {
  children?: React.ReactNode
}

const PROJECTS_LINKS = [
  { label: 'Жилье', href: '#' },
  { label: 'Коммерческие', href: '#' },
  { label: 'Инвестиции', href: '#' },
  { label: 'Ипотека', href: '#' },
]

const COMPANY_LINKS = [
  { label: 'О компании', href: '#' },
  { label: 'Контакты', href: '#' },
  { label: 'Пресс-центр', href: '#' },
  { label: 'Документы', href: '#' },
]

export const Footer = ({}: FooterProps) => {
  return (
    <Box className={s.root}>
      <Grid cols="1" cols_m="2">
        <Box className={s.subscribe} px="4" pb="6" pt="5" p_m="5">
          <Box mb="10" display_m="none">
            <Logo />
          </Box>

          <Text s="20" lh="32" w="400" color="neutrals-white" s_l="24" lh_l="32">
            Подпишитесь на новости
          </Text>

          <Text s="14" lh="20" w="400" color="neutrals-gray-4" mt="2" s_l="20" lh_l="32" mt_l="3">
            Узнавайте первым о новостях и стартах новых проектов компании по почте
          </Text>

          <Box mt="4" mt_m="5" mt_l="4">
            <Button s="large" variant="whiteStroke">
              Подписаться
            </Button>
          </Box>
        </Box>

        <Box className={s.follow} px="4" py="6" p_m="5">
          <Text s="20" lh="32" w="400" color="neutrals-white" s_l="24" lh_l="32">
            Следуйте за нами
          </Text>

          <Text s="14" lh="20" w="400" color="neutrals-gray-4" mt="2" s_l="20" lh_l="32" mt_l="3">
            Подписывайтесь на наш канал и будьте в курсе всех событий на проектах
          </Text>

          <Box mt="4" mt_m="5" mt_l="4">
            <Button s="large" variant="whiteStroke" post={<Icon name="arrowRight" />}>
              Telegram
            </Button>
          </Box>
        </Box>
      </Grid>

      <Grid cols="2" cols_m="4" className={s.links}>
        <Flex
          dir="column"
          jc="space-between"
          className={s.logoBlock}
          px="5"
          pt="7"
          pb="8"
          pb_l="10"
          display="none"
          display_m="flex">
          <Logo />
          <Box className={s.honestDevelopment}>
            <HonestDevelopment />
          </Box>
        </Flex>

        <Flex dir="column" g="3" px="4" py="6" px_m="5" pb_m="8" pb_l="10">
          <Text s="20" lh="32" w="400" s_m="16" lh_m="24" s_l="20" lh_l="32" color="neutrals-white">
            Проекты
          </Text>

          {PROJECTS_LINKS.map(({ label, href }) => (
            <Link href={href} key={label} as="span" className={s.link}>
              <Text s="16" lh="24" w="400" color="neutrals-gray-4">
                {label}
              </Text>
            </Link>
          ))}
        </Flex>

        <Flex dir="column" g="3" px="4" py="6" px_m="5" pb_m="8" pb_l="10">
          <Text s="20" lh="32" w="400" s_m="16" lh_m="24" s_l="20" lh_l="32" color="neutrals-white">
            Компания
          </Text>

          {COMPANY_LINKS.map(({ label, href }) => (
            <Link href={href} key={label} as="span" className={s.link}>
              <Text s="16" lh="24" w="400" color="neutrals-gray-4">
                {label}
              </Text>
            </Link>
          ))}
        </Flex>

        <Box px="4" py="6" px_m="5" pb_m="8" pb_l="10">
          <Text s="20" lh="32" w="400" s_m="16" lh_m="24" s_l="20" lh_l="32" color="neutrals-white">
            Всегда на связи
          </Text>

          <Text s="14" lh="20" color="neutrals-gray-4" display_m="none" mt="2">
            Узнавайте первым о новостях и стартах новых проектов компании по почте
          </Text>

          <Flex className={s.contacts} dir="column" g="3">
            <Link href="#" as="span" className={s.link}>
              <Text s="16" lh="24" w="500" color="neutrals-white">
                +7 (495) 124-31-76
              </Text>
            </Link>
            <Link href="#" as="span" className={s.link}>
              <Text s="16" lh="24" w="500" color="neutrals-white">
                info@stonehedge.ru
              </Text>
            </Link>
            <Link href="#" as="span" className={s.link}>
              <Text s="16" lh="24" w="500" color="neutrals-white">
                Telegram
              </Text>
            </Link>
          </Flex>
        </Box>
      </Grid>

      <Grid cols="1" cols_m="4" className={s.bottomBar}>
        <Flex dir="column" dir_m="row" px="4" py="6" g="2" g_m="3" g_l="2">
          <Text s="14" lh="20" s_l="16" lh_l="24" w="400" color="neutrals-gray-4">
            г. Москва, ул. Нижняя Красносельская, д 35, стр. 9, лобби 2
          </Text>
          <Link href="#" as="span" className={s.link}>
            <Text s="14" lh="20" s_l="16" lh_l="24" w="400" color="neutrals-white">
              На карте
            </Text>
          </Link>
        </Flex>

        <Text px="4" pb="4" pt="0" p_m="5" color="neutrals-gray-4">
          &copy;&nbsp;АО&nbsp;&quot;СТОУНХЕДЖ&quot;
        </Text>
      </Grid>
    </Box>
  )
}
