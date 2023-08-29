import { Post } from "@/lib/types";
import Image from "next/image";
import React, { useMemo } from "react";
import * as DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import { dateFormatter, getReadingTime } from "@/lib/utils";

interface BigCardProps {
  posts: Post[];
}

export default function BigCard({ posts }: BigCardProps) {


  const readingTime = useMemo(
    () => getReadingTime(posts[0]?.content?.rendered),
    [posts[0]]
  );


  return (
    <div className="flex flex-col items-start">
      <div className="mb-5 md:w-webkit-fill-available">
        <Image
          src={posts[0]?.jetpack_featured_media_url}
          width={700}
          height={500}
          alt="ds"
          className="shadow-xl w-webkit-fill-available h-auto md:h-full md:w-full object-cover transition-all duration-300 ease-linear hover:-translate-y-2 hover:brightness-110"
        />
      </div>
     <Link href={posts[0]?.slug}>
        <span className="text-xl md:text-3xl font-bold mb-3">
          {posts[0]?.title?.rendered}
        </span>
      </Link>
      <span className="text-sm font-bold text-gray-400 mb-3 uppercase">
       {dateFormatter(posts[0].modified)} - {readingTime} MINS READ
      </span>
       <span
        className="text-gray-500 overflow-hidden line-clamp-2"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(posts[0]?.excerpt.rendered),
        }}
      ></span>
    </div>
  );
}
