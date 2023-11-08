export interface IBaseElement {
  svg: string;
  title: string;
  note: string;
  id: number;
  text: string
}
  
export interface IPurposeElement {
  purposeTitle: string;
  purpose: IBaseElement[];
}

export interface IMappedInvestmentsTabsData {
    firstTabData: IBaseElement[] | null;
    secondTabData: IPurposeElement[] | null;
}