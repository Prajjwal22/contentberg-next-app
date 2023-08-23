export const fetchPosts = async () => {
  try {
    const response = await fetch(
      "https://lovegunitepool.com/wp-json/wp/v2/posts?_embed&per_page=20",
      { method: "GET" }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Return an empty array or handle the error in an appropriate way
  }
};

export const getPostBySlug = async (slug: string) => {
  try {
    const response = await fetch(
      `https://lovegunitepool.com/wp-json/wp/v2/posts?_embed&slug=${slug}`,{ next: { revalidate: 3600 } }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};


export const getPostsByCategory = async (id: number) => {
  try {
    const response = await fetch(
      `https://lovegunitepool.com/wp-json/wp/v2/posts?_embed&category=${id}&per_page=4`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}