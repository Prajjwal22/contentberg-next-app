import React from "react";
import SectionHeader from "./SectionHeader";
import BigCard from "./cards/BigCard";
import { Post } from "@/lib/types";
import TinyCard from "./cards/TinyCard";

interface MultiGridProps {
  posts: Post[];
}

export default function MultiGrid({ posts }: MultiGridProps) {
  return (
    <section className="w-full flex flex-col items-center mb-5">
      <SectionHeader />
      <div className="grid md:grid-cols-4 gap-4">
        <div className="col-span-2">
          <BigCard posts={posts} />
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {posts.slice(11, 15).map((post) => (
            <TinyCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
