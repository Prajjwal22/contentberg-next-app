export type Post = {
  title: {
    rendered: string;
  };
  _embedded: {
    "wp:term": WpTerm[];
  };
  id: number;
  modified_by: string;
  date_gmt: Date;
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  author_info: {
    display_name: string;
    author_link: string;
  };
  jetpack_featured_media_url: string;
};

export type WpTerm = {
  name: string;
  link: string;
};

export interface SinglePost {
  title: {
    rendered: string;
  };
  _embedded: {
    "wp:term": WpTerm[];
  };
  id: number;
  modified_by: string;
  date_gmt: Date;
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  author_info: {
    display_name: string;
    author_link: string;
  };
  jetpack_featured_media_url: string;
}
