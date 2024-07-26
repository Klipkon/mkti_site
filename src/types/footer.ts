import type { IHeaderArrtibutes } from "./header";

export interface IFooter {
  id: number;
  attributes: IHeaderArrtibutes & {
    caption: string;
    social_media: ISocialMediaLink[];
  };
}

export interface ISocialMediaLink {
  id: number;
  icon: string;
  href: string;
}
