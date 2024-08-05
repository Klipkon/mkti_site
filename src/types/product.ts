import type {
  IButton,
  IImage,
  IImageData,
  ISeo,
  ITitleWithDescription,
} from "./page";

export interface IProductCategory {
  id: number;
  attributes: {
    slug?: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    seo?: ISeo;
    image?: IImage;
  };
}

export interface IProduct {
  id: number;
  attributes: {
    slug: string;
    seo?: ISeo;
    thumbnail: IImage;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    images: {
      data: IImageData[];
    };
    titleWithDescription?: ITitleWithDescription;
    button?: IButton;
    product_categories: {
      data: IProductCategory[];
    };
    content: string;
    files?: {
      data: IImageData[];
    };
  };
}
