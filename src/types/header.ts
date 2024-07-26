import type { IImage } from "./page";

export interface IHeader {
  id: number;
  attributes: IHeaderArrtibutes;
}

export interface IHeaderArrtibutes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  logo: IImage;
  navigation: ILink[];
}

export interface ILink {
  id: number;
  content: string;
  href: string;
}
