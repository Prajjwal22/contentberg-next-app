import { Post } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface TinyCardProps {
  post: Post;
}

export default function TinyCard({ post }: TinyCardProps) {
  return (
    <div className="flex flex-col items-center gap-4">

        <Image
          className=" object-contain"
          src={post?.jetpack_featured_media_url}
          width={350}
          height={350}
          alt="post tiel"
        />
      <Link href={post.slug}><span className="text-lg font-bold">{post?.title.rendered}</span></Link>
    </div>
  );
}
