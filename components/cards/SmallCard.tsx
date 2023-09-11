import {  SinglePost } from "@/lib/types";
import Image from "next/image";
import React from "react";
import * as DOMPurify from "isomorphic-dompurify";
import { dateFormatter, } from "@/lib/utils";
import Link from "next/link";

interface SmallCardProps {
  post: SinglePost;
}

export default function SmallCard({ post }: SmallCardProps) {

  return (
    <div className="flex flex-col items-start">
      <div className="mb-5">
        <Link href={`/${post?.slug}`}><Image
          src={post?.jetpack_featured_media_url}
          width={500}
          height={300}
          alt="ds"
          className="shadow-xl h-full w-full object-cover transition-all duration-300 ease-linear hover:-translate-y-2 hover:brightness-110"
        /></Link>
      </div>
      <Link href={`/${post?.slug}`}><span className="text-xl md:text-2xl font-bold mb-4" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(post?.title?.rendered)}}>
      </span></Link>
      <span className="text-sm font-bold text-gray-400 mb-3 uppercase">
        {dateFormatter(post.date_gmt)} - By {post?.author_info?.display_name || "Editorial Staff"}
      </span>
      <span className="text-gray-500 overflow-hidden leading-7 line-clamp-2	" dangerouslySetInnerHTML={{__html : DOMPurify.sanitize(post?.excerpt?.rendered)}}></span>
    </div>
  );
}
