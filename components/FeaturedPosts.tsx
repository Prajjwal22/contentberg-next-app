import React from "react";
import BigCard from "./cards/BigCard";
import TextCard from "./cards/TextCard";
import { Post } from "@/lib/types";

interface FeaturedPostsProps {
  posts: Post[];
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <section className="w-full mb-5">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 items-start justify-between">
        <div className="col-span-2">
          <BigCard posts={posts} />
        </div>
        <div className="col-span-2 md:col-span-1 flex flex-col">
          <span className="text-2xl font-bold mb-4 border-b w-full">
            What&apos;s New?
          </span>

          {posts.splice(1, 4).map((post) => (
            <TextCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
