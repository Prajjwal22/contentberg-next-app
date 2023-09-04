import { MenuItem, Post } from "./types";

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(
      "https://lovegunitepool.com/wp-json/wp/v2/posts?_embed&per_page=20",
      { cache: "force-cache" }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Return an empty array or handle the error in an appropriate way
  }
};

export const getPostBySlug = async (
  slug: string
): Promise<Post | undefined> => {
  try {
    const response = await fetch(
      `https://lovegunitepool.com/wp-json/wp/v2/posts?_embed&slug=${slug}`,
      { next: { revalidate: 3600 } }
    );
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const getPostsByCategory = async (id: number) => {
  try {
    const response = await fetch(
      `https://lovegunitepool.com/wp-json/wp/v2/posts?_embed&categories=${id}&per_page=4`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const getPostsBySearch = async (query: string) => {
  try {
    const response = await fetch(
      `https://lovegunitepool.com/wp-json/wp/v2/search/?subtype=post&search=${query}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const getPaginatedPosts = async (
  currentPage: number,
  perPage: number
) => {
  try {
    const response = await fetch(
      `https://lovegunitepool.com/wp-json/wp/v2/posts?_embed&page=${currentPage}&per_page=${perPage}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const fetchTotalPostsCount = async () => {
  try {
    const response = await fetch(
      `https://lovegunitepool.com/wp-json/wp/v2/posts?_fields=id`, // Just fetching ids to get total count
      {
        headers: {
          "X-WP-Total": "true", // Include X-WP-Total header to get total count
        },
      }
    );
    const totalCount = response.headers.get("X-WP-Total");
    return totalCount ? parseInt(totalCount) : 0;
  } catch (error) {
    console.error("Error fetching total posts count:", error);
    return 0;
  }
};

export const fetchRankMathSEO = async (slug: string) => {
  try {
    const response = await fetch(
      `https://lovegunitepool.com/wp-json/rankmath/v1/getHead?url=https://lovegunitepool.com/${slug}`
    );
    const data = await response.json();
    return data.head;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const fetchMenus = async (id: number) => {
  try {
    const response = await fetch(
      `https://lovegunitepool.com/wp-json/wp/v1/menu/${id}`
    );
    const data = await response.json();
    return data.map((item: MenuItem) => {
      return {
        ID: item.ID,
        title: item.title,
        url: item.url,
        menu_item_parent: item.menu_item_parent,
        child: item.menu_item_parent !== "0" ? true : false,
      };
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const fetchPages = async () => {
  try {
    const response = await fetch(
      "https://lovegunitepool.com/wp-json/wp/v2/pages",
      { cache: "force-cache" }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Return an empty array or handle the error in an appropriate way
  }
};


export const getPageBySlug = async (
  slug: string
)=> {
  try {
    const response = await fetch(
      `https://lovegunitepool.com/wp-json/wp/v2/pages?slug=${slug}`,
      { next: { revalidate: 3600 } }
    );
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};