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
    categories: {
      data: ICategory[];
    };
    slug: string;
  };
}

export interface ICategory {
  id: number;
  attributes: {
    slug: string;
    name: string;
  };
}
