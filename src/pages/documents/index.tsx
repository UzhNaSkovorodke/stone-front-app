import { FC } from 'react'
import { GetStaticProps } from 'next'
import { MainLayout } from 'src/layouts/MainLayout'
import { Documents } from 'src/features/documents/Documents'
import { ICommonResponse } from 'src/shared/services/pageData/common/common.interface'
import {
  IDocumentData,
  IDocumentsResponse,
} from 'src/shared/services/pageData/documents/documents.interface'
import { getDocuments } from 'src/shared/services/pageData/documents/documetns'
import { getCommon } from 'src/shared/services/pageData/common/common'
import HeadSeo from 'src/features/headSeo/HeadSeo'

interface ISlugs {
  label: string
  value: string
}

interface IDocumentsProps {
  common: ICommonResponse
  document: IDocumentsResponse
  title: string
  slugs: ISlugs[]
  id: string
}

export const getStaticProps: GetStaticProps = async () => {
  const commonData: ICommonResponse = await getCommon()
  const documentsData: IDocumentsResponse = await getDocuments()

  const documentData = documentsData.data.attributes.default_doc.data

  const slugList = documentsData.data.attributes.documents.data.map((path: IDocumentData) => {
    return {
      label: path.attributes.title,
      value: path.attributes.slug,
    }
  })

  return {
    props: {
      common: commonData,
      document: documentData.attributes,
      title: documentsData.data.attributes.title,
      slugs: slugList,
      id: documentData.attributes.slug,
    },
    revalidate: 120,
  }
}

const DocumentsPage: FC<IDocumentsProps> = ({ common, document, title, slugs, id }) => {
  return (
    <>
      <HeadSeo />
      <MainLayout common={common.data?.attributes}>
        {/*TODO перенести в нужный слайс по fsd компонент Documents*/}
        <Documents document={document} title={title} slugs={slugs} id={id} />
      </MainLayout>
    </>
  )
}

export default DocumentsPage
