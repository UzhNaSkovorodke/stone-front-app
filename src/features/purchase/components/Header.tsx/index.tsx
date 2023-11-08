import { Text } from 'shared/uikit/Text'
import classes from './style.module.scss'
import { Flex } from 'shared/uikit/Flex'

interface IHeaderPurchase {
  header: string
  description: string
}

const HeaderPurchase = ({ header, description }: IHeaderPurchase) => {
  return (
    <Flex dir="column" ai="center" className={classes.root}>
      <Text as="h1" html={header} />
      <Text as="p" html={description} />
    </Flex>
  )
}

export default HeaderPurchase
