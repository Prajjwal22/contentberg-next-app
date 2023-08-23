export type Post = {
  id: number;
  modified: Date;
  title: {
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
  _embedded: {
    "wp:term": WpTerm[];
  };
};

export type WpTerm = {
  name: string;
  link: string;
};

export interface SinglePost {
  id: number;
  modified: string;
  title:string
  excerpt: {
    rendered: string;
  };
  slug: string;
  author_info: {
    display_name: string;
    author_link: string;
  };
  featured_image_src: string;
  _embedded: {
    "wp:term": WpTerm[];
  };
}
