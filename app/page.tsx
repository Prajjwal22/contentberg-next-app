
import React, { useEffect, useState } from "react";
import FeaturedPosts from "@/components/FeaturedPosts";
import { Post } from "@/lib/types";
import { fetchPosts } from "@/lib/wordpress";
import TwoColGrid from "@/components/TwoColGrid";
import ThreeColGrid from "@/components/ThreeColGrid";

// interface Props {
//   posts: Post[];
// }

export default async function Home() {
const posts = await fetchPosts()

  return (
    <main className="max-w-6xl m-auto my-6 p-2">
      <FeaturedPosts posts={posts} />
      <TwoColGrid posts={posts} />
      <ThreeColGrid posts={posts} />
    </main>
  );
}
