import { IDefaultAttributes, IDefaultBlock } from '../default/default.interface'

export interface IDocumentsResponse {
  data: IDocumentsData
  text: string
}

export interface IDocumentsData extends IDefaultBlock {
  attributes: IDocumentsAttributes
}

interface IDocumentsAttributes extends IDefaultAttributes {
  documents: IDocument
  default_doc: IDefaultDocument
  title: string
}

export interface IDefaultDocument {
  data: IDocumentData
}
export interface IDocument {
  data: IDocumentData[]
}

export interface IDocumentData extends IDefaultBlock {
  attributes: IDocumentAttributes
}

export interface IDocumentAttributes extends IDefaultAttributes {
  slug: string
  title: string
}
