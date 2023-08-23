"use client";

import React, { useEffect, useState } from "react";
import FeaturedPosts from "@/components/FeaturedPosts";
import { Post } from "@/lib/types";
import { fetchPosts } from "@/lib/wordpress";
import TwoColGrid from "@/components/TwoColGrid";
import ThreeColGrid from "@/components/ThreeColGrid";

// interface Props {
//   posts: Post[];
// }

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchAndSetPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    };

    fetchAndSetPosts();
  }, []);

  console.log(posts);

  return (
    <main className="max-w-6xl m-auto my-6 p-2">
      <FeaturedPosts posts={posts} />
      <TwoColGrid posts={posts} />
      <ThreeColGrid posts={posts} />
    </main>
  );
}
