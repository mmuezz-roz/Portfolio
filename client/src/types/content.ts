export type Project = {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  imageUrl: string;
  liveUrl: string;
  tags: string[];
  featured?: boolean;
  order?: number;
};

export type BlogPost = {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  publishedAt: string;
};
