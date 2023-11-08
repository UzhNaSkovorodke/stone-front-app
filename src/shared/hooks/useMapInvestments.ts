import {
  ICommercialProjectInvestmentSectionForInvestment,
  ICommercialProjectInvestmentSectionForInvestmentCol,
} from '../services/pageData/commercialProject/commercialProject.interface'
import {
  IDefaultColSection,
  IDefaultColSectionCol,
} from '../services/pageData/default/default.interface'
import {
  IBaseElement,
  IMappedInvestmentsTabsData,
  IPurposeElement,
} from '../types/investments/investments'

export const useMapInvestments = (
  firstTab: IDefaultColSection | undefined,
  secondTab: ICommercialProjectInvestmentSectionForInvestment | undefined
): IMappedInvestmentsTabsData => {
  const mapInvestmentDataToBaseElements = (
    investTabCols: IDefaultColSectionCol[]
  ): IBaseElement[] | null => {
    if (investTabCols && investTabCols.length > 0) {
      return mapColsToBaseElements(investTabCols)
    }

    return null
  }

  const mapInvestmentDataToPurposeElements = (
    investTabCols: ICommercialProjectInvestmentSectionForInvestmentCol[]
  ): IPurposeElement[] | null => {
    if (investTabCols && investTabCols.length > 1) {
      return investTabCols.map((invest: ICommercialProjectInvestmentSectionForInvestmentCol) => ({
        purposeTitle: invest.title,
        purpose: mapColsToBaseElements(invest.col),
      }))
    }

    return null
  }

  const mapColsToBaseElements = (cols: IDefaultColSectionCol[]): IBaseElement[] => {
    return cols.map((col: IDefaultColSectionCol) => ({
      title: col.title || '',
      note: col.text || '',
      svg: `${process.env.NEXT_PUBLIC_STONE_CMS_API_URL}${col.img?.data?.attributes?.url}` || '',
      id: col.id,
      text: col.text || '',
    }))
  }

  return {
    firstTabData: firstTab ? mapInvestmentDataToBaseElements(firstTab.col) : null,
    secondTabData: secondTab ? mapInvestmentDataToPurposeElements(secondTab.col) : null,
  }
}
