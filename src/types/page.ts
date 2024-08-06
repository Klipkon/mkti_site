export interface IPage {
  id: number;
  attributes: IPageAttributes;
}

export interface IPageAttributes {
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  slug: string;
  components: IComponent[];
  seo: ISeo;
}

export interface IComponent {
  id: number;
  __component: string;
  image?: IImage;
  images?: {
    data: IImageData[];
  };
  buttons?: IButton[];
  title?: string;
  description?: string;
  highlightedWords?: string;
  chips?: IChip[];
  button?: IButton;
  titleWithDescription?: ITitleWithDescription;
  cards?: IAboutCard[];
  content?: string;
}

export interface ISeo {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  metaRobots?: string;
  structuredData?: string;
  metaViewport?: string;
  canonicalURL?: string;
}

export interface IButton {
  id: number;
  content: string;
  size: "default" | "sm" | "icon";
  variant: "default" | "secondary" | "ghost";
  href: string;
  icon: string;
}

export interface IImage {
  data: IImageData;
}

export interface IImageData {
  id: number;
  attributes: {
    name: string;
    alternativeText: string;
    caption: null;
    width: number;
    height: number;
    formats: null;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null;
    provider: string;
    provider_metadata: null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IChip {
  id: number;
  content: string;
  icon: string;
}

export interface ITitleWithDescription {
  id: number;
  title: string;
  description: string;
}

export interface IAboutCard {
  icon: "dollar-sign" | "book-marked" | "shield-check";
  title: string;
  description: string;
}
