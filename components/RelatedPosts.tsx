"use client";

import React, { useEffect, useState } from "react";
import SmallCard from "./cards/SmallCard";
import { getPostsByCategory } from "@/lib/wordpress";
import { Post } from "@/lib/types";
import TinyCard from "./cards/TinyCard";

interface RelatedPostsProps {
  category: {
    id: number;
    link: string;
    name: string;
    slug: string;
  };
}

export default function RelatedPosts({ category }: RelatedPostsProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      let posts = await getPostsByCategory(category.id);
      setPosts(posts);
    };

    fetchRelatedPosts();
  }, [category.id]);
  console.log(category.id);

  return (
    <section className="flex flex-col gap-4 w-full items-center">
      <span className="text-2xl font-bold border-b-2 border-b-gray-200">
        You Might Also Like!
      </span>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full m-auto">
        {posts.map((post) => (
          <TinyCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
