import React from "react";
import SectionHeader from "./SectionHeader";
import Button from "./Button";
import { Post } from "@/lib/types";
import SmallCard from "./cards/SmallCard";

interface TwoColGridProps {
  posts: Post[];
}

export default function TwoColGrid({ posts }: TwoColGridProps) {
  return (
    <section className="w-full flex flex-col items-center">
      <SectionHeader />
      <div className="">
        <div className="flex flex-col md:flex-row gap-5">
          {posts.slice(1,3).map((post) => (
            <SmallCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      <Button />
    </section>
  );
}
