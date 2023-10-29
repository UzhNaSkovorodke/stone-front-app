import {
  IDefaultAttributes,
  IDefaultBlock,
  IDefaultData,
  IDefaultLink,
  IDefaultPageResponse,
  IDefaultProjects,
  IDefaultSlide,
  IDefaultSpeakers,
} from "../default/default.interface";

export interface IMainPageResponse extends IDefaultPageResponse {
  data: IMainData;
}

export interface IMainData extends IDefaultData {
  attributes: IMainPageAttributes;
}

export interface IMainPageAttributes extends IDefaultAttributes {
  locale: string;
  block_arc: IBlockArchitects;
  block_standarts: IBlockStandards;
  block_awards: IBlockAwards;
  block_history: IBlockHistory;
  block_slider: IDefaultSlide[];
  block_slogan: IDefaultBlock;
  block_speakers: IBlockSpeakers;
  block_advantages: IDefaultBlock[];
  block_directions: IBlockDirection[];

  stone_projects: IDefaultProjects;
}

export interface IAwardsAndHistory {
  awards: IBlockAwards;
  history: IBlockHistory;
}

export interface IBlockStandards {
  id: number;
  title: string;
  standarts: IDefaultBlock[];
}

export interface IBlockSpeakers {
  id: number;
  speakers: IDefaultSpeakers;
  title: string;
}

export interface IBlockDirection {
  button: IDefaultLink;
  id: number;
  img: unknown;
  title: string;
}

interface IBlockAwards {
  awards: IDefaultSlide[];
  id: number;
  title: string;
}

interface IBlockHistory {
  id: number;
  slider: IDefaultSlide[];
  title: string;
}

export interface IBlockArchitects {
  id: number;
  slider: IDefaultSlide[];
  title: string;
}
