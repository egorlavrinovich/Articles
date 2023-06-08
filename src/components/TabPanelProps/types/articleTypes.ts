import { IPath } from '../../API/addTopic';

export interface INotes{
  articleDescription: string;
  img: string
  id:string | number
}

export interface IArticles {
  id:string|number;
  notes?:INotes[]
}

export interface ICards {
  id: string | number;
  title?: string;
  img: string;
  cardDescription: string;
  topicId:number|string;
  articleUrl:IPath;
}

export interface IThemes {
  id:number
  tabName: string;
  url: string;
  cards: ICards[];
}
