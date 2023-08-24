import { Post } from "@/lib/types";
import React from "react";
import SmallCard from "./cards/SmallCard";
import SectionHeader from "./SectionHeader";

interface ThreeColGridProps {
  posts: Post[];
}
export default function ThreeColGrid({ posts }: ThreeColGridProps) {
  console.log(posts);
  return (
    <section className="w-full flex flex-col items-center mb-5">
      <SectionHeader />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-5">
        {posts.slice(7, 13).map((post) => (
          <SmallCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
