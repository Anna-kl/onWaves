export interface FaqImage {
  url: string;
  caption?: string;
}

export interface FaqContent {
  paragraphs?: string[];
  list?: string[];
  images?: FaqImage[];
}