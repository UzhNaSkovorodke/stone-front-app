import {
  IDefaultAttributes,
  IDefaultBlock,
  IDefaultData,
  IDefaultImg,
  IDefaultLink,
  IDefaultPageResponse,
  IDefaultProjects,
  IDefaultSlide,
} from "../default/default.interface";
import { IBlockPromo } from "../office/office.interface";

export interface IResidentialPageResponse extends IDefaultPageResponse {
  data: IResidentialData;
}

export interface IResidentialData extends IDefaultData {
  attributes: IResidentialPageAttributes;
}

export interface IResidentialPageAttributes extends IDefaultAttributes {
  locale: string;
  BlockMain: IBlockMain;
  BlockPromo: IBlockPromo[];
  BlockPromoMiddle: IBlockPromo;
  Advantages: IResidentialBlockAdvantages;
  BlockSpeakers: IResidentialBlockSpeakers;
  BlockAction: IResidentialBlockAction;
  stone_projects: IDefaultProjects;
}

export interface IResidentialBlockSpeakers {
  id: number;
  speakers: ISpeakers;
  title: string;
}

export interface ISpeakers {
  data: ISpeakersData[];
}

export interface ISpeakersData extends IDefaultData {
  attributes: ISpeakersAttributes;
}

export interface ISpeakersAttributes extends IDefaultAttributes {
  speaker_name: string;
  sub_text: string;
  text: string;
  img: IDefaultImg;
}

export interface IBlockMortgage extends IDefaultBlock {
  button: unknown;
}

export interface IBlockMain extends IDefaultBlock {
  button: IButtonMain;
}

export interface IResidentialBlockAdvantages {
  title: string;
  slider: IDefaultSlide[];
  id: number;
}

export interface IResidentialBlockAction extends IDefaultBlock {
  subtext: string;
  img: IDefaultImg;
  button: IDefaultLink;
}

interface IButtonMain {
  id: number;
  text: string;
  link: string;
}
