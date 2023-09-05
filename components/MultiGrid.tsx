import React from "react";
import SectionHeader from "./SectionHeader";
import BigCard from "./cards/BigCard";
import { Post } from "@/lib/types";
import TinyCard from "./cards/TinyCard";
import { getPostsByCategory } from "@/lib/wordpress";

interface MultiGridProps {
  posts: Post[];
}

export default async function MultiGrid({  }: MultiGridProps) {

  const posts = await getPostsByCategory(9)
  return (
    <section className="w-full flex flex-col items-center mb-5">
      <SectionHeader link="/category/maintenance-tips" title="Maintenance" />
      <div className="grid md:grid-cols-4 gap-4">
        <div className="col-span-2">
          <BigCard posts={posts} />
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {posts.splice(1,4).map((post:Post) => (
            <TinyCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
