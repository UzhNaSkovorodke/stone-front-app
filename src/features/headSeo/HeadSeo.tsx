import Head from 'next/head'

const HeadSeo = ({
  description = 'STONE девелопер коммерческой и жилой недвижимости',
  title = 'STONE',
}: {
  description?: string
  title?: string
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:type" content="business.business" />
      <meta property="og:title" content="STONE" />
      <meta property="og:description" content="STONE девелопер коммерческой и жилой недвижимости" />
      <meta property="og:url" content="https://stone.ru/" />
      <meta
        property="og:image"
        content="https://cms.stonehedgecompany.com/uploads/05_74071a49f4.jpg"
      />
      <meta property="og:locale" content="ru" />
      <link rel="icon" href="/image/favicon.ico" sizes="any" />
    </Head>
  )
}
export default HeadSeo
