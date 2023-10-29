import {
  IDefaultAttributes,
  IDefaultImg,
  TLocale,
} from "../default/default.interface";

export enum EPointId {
  RESIDENTIAL_COMPLEXES = 1,
  PARKS = 2,
  CAFE_RESTAURANTS = 3,
  SPORT = 4,
  BUSINESS = 5,
}

export interface IPointTypesResponse {
  data: IPointTypesData[];
}

export interface IPointTypesData {
  attributes: IPointTypesAttributes;
  id: number;
}

export interface IPointTypesAttributes extends IDefaultAttributes {
  title: string | null;
  locale: TLocale;
  uuid: string | null;
  img: IDefaultImg;
}
