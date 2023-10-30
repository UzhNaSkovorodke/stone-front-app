import {
  IDefaultAttributes,
  IDefaultData,
  IDefaultPageResponse,
} from "../default/default.interface";
import { IBlockForm } from "../investments/investments.interface";
import { IDefaultButton, IDefaultImg } from "../default/default.interface";

export interface IBlockIntro {
  icons: ICharacteristics[];
  id: number;
  title: string;
}

export interface ICharacteristics {
  title: string;
  img: IDefaultImg;
}

export interface IBlockPersonal {
  conditionals: {
    title: string;
    text: string;
    percent: string;
  }[];
  icons: ICharacteristics[];
  main: {
    id: number;
    text: string;
    title: string;
    img: IDefaultImg;
    button: IDefaultButton;
  };
  title: string;
  mobTitle: string;
}

export interface IBlockReferrer {
  title: string;
  text: string;
  headerBtn: {
    title: string;
    text: string;
    button: IDefaultButton;
  };
  steps: {
    text: string;
  }[];
  img: {
    title: string;
    img: IDefaultImg;
  };
}

export interface ILoyaltyResponse extends IDefaultPageResponse {
  data: ILoyaltyData;
}

export interface ILoyaltyData extends IDefaultData {
  attributes: ILoyaltyDataAttributes;
}

export interface ILoyaltyDataAttributes extends IDefaultAttributes {
  BlockIntro: IBlockIntro;
  BlockPerson: IBlockPersonal;
  BlockReferral: IBlockReferrer;
  BlockForm: IBlockForm;
}
