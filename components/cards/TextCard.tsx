import { Post, WpTerm } from "@/lib/types";
import * as DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import React from "react";

type TextCardProps = {
  post: Post;
};

export default function TextCard({ post }: TextCardProps) {
  const categories = post._embedded?.["wp:term"]?.[0];


  return (
    <div className="flex flex-col items-start gap-1 mt-2 mb-4">
      {Array.isArray(categories) && categories.map((category, i) => (
        <span
          key={i}
          className="font-bold text-xs md:text-sm tracking-wider text-blue-700 uppercase"
        dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(category.name)}}>
        </span>
      ))}
      <span className="text-lg md:text-xl font-bold">
        <Link href={post.slug}>{post.title.rendered}</Link>
      </span>
      <span className="text-sm text-gray-400 font-bold">
        10 Aug 2023 - 5 Mins Read
      </span>
    </div>
  );
}
