import React from "react";
import SectionHeader from "./SectionHeader";
import Button from "./Button";
import { Post } from "@/lib/types";
import SmallCard from "./cards/SmallCard";
import { getPostsByCategory } from "@/lib/wordpress";

interface TwoColGridProps {
  posts: Post[];
}


export default async function TwoColGrid({  }: TwoColGridProps) {
const posts = await getPostsByCategory(5)

  return (
    <section className="w-full flex flex-col items-center mb-5">
      <SectionHeader title="Design Ideas" link="/category/design-ideas" />
      <div className="">
        <div className="flex flex-col md:flex-row gap-5">
          {posts.slice(1,3).map((post:Post) => (
            <SmallCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      {/* <Button / */}
    </section>
  );
}
