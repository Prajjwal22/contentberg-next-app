import { Post } from "@/lib/types";
import React from "react";
import SmallCard from "./cards/SmallCard";
import SectionHeader from "./SectionHeader";
import Pagination from "./Pagination";

interface ThreeColGridProps {
  posts: Post[];
}
export default function ThreeColGrid({ posts }: ThreeColGridProps) {
  return (
    <section className="w-full flex flex-col items-center mb-5">
      <SectionHeader title="Recent Posts" link="#" />
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-5">
        {posts.slice(7, 13).map((post) => (
          <SmallCard key={post.id} post={post} />
        ))}
      </div> */}
      <Pagination />
    </section>
  );
}
