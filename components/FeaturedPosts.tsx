import React from "react";
import BigCard from "./cards/BigCard";
import TextCard from "./cards/TextCard";
import { Post } from "@/lib/types";
import { getPostsByCategory } from "@/lib/wordpress";
import Link from "next/link";

interface FeaturedPostsProps {
  posts: Post[];
}

export default async function FeaturedPosts({  }: FeaturedPostsProps) {

  const posts = await getPostsByCategory(4)
  return (
    <section className="w-full mb-5">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 items-start justify-between">
        <div className="col-span-2">
          <BigCard posts={posts} />
        </div>
        <div className="col-span-2 md:col-span-1 flex flex-col">
          <span className="text-2xl font-bold mb-4 border-b w-full">
            Pool 101 Guides <Link href="/category/gunite-pool-101/" className="text-xs text-gray-400 font-light">View All</Link>
          </span>

          {posts.splice(1, 5).map((post:Post) => (
            <TextCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
