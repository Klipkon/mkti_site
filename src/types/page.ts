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
  buttons: IButton[];
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
  data: {
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
  };
}
