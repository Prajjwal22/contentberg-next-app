import { Post, SearchPosts } from "@/lib/types";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import React from "react";

interface SearchCard {
  post: SearchPosts;
}

export default function SearchCard({ post }: SearchCard) {
  return (
    <div className="p-3 border cursor-pointer hover:bg-slate-200 text-xs md:text-md">
      <Link href={post.url} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.title)}}>
      </Link>
    </div>
  );
}
