import { Post, WpTerm } from "@/lib/types";
import { dateFormatter, getReadingTime } from "@/lib/utils";
import { read } from "fs";
import * as DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import React, { useMemo } from "react";

type TextCardProps = {
  post: Post;
};

export default function TextCard({ post }: TextCardProps) {
  const categories = post._embedded?.["wp:term"]?.[0];

  const readingTime = useMemo(
    () => getReadingTime(post?.content?.rendered),
    [post]
  );



  return (
    <div className="flex flex-col items-start gap-1 mt-2 mb-4">
      {/* {Array.isArray(categories) && categories.map((category, i) => (
        <span
          key={i}
          className="font-bold text-xs md:text-sm tracking-wide text-blue-700 uppercase"
        dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(category.name)}}>
        </span>
      ))} */}
     <Link href={post.slug}> <span className="text-lg md:text-xl font-bold" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(post.title.rendered)}}>
      </span></Link>
      <span className="text-sm text-gray-400 font-bold uppercase">
        {dateFormatter(post.modified)} - {readingTime} Mins Read
      </span>
    </div>
  );
}
