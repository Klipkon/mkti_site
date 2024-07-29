import type { ISeo } from "./page";

export interface IArticle {
  id: number;
  attributes: {
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    title: string;
    seo: ISeo;
    categories: ICategory[];
  };
}

export interface ICategory {
  name: string;
}
