export interface Page {
  id: number;
  attributes: PageAttributes;
}

export interface PageAttributes {
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  slug: string;
  components: Component[];
}

export interface Component {}
