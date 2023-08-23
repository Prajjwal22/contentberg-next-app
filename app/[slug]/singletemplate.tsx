import { dateFormatter, getReadingTime } from "@/lib/utils";
import DOMPurify from "dompurify";
import Lottie from "lottie-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaReddit, FaTwitter } from "react-icons/fa";
import ImagePlaceholder from "../../lottie/animation_llncsb4x.json";

interface SingleTemplateProps {
  post: {
    title: { rendered: string };
    id: number;
    slug: string;
    content: { rendered: string };
    jetpack_featured_media_url: string;
    modified_by: string;
    date_gmt: Date;
    _embedded: {
      "wp:term": Array<{
        id: number;
        link: string;
        name: string;
        slug: string;
      }>;
    };
  };
}

export default function SingleTemplate({ post }: SingleTemplateProps) {
  const categories = post._embedded?.["wp:term"]?.[0];

  console.log(categories);
  return (
    <div className="w-full relative">
      {post?.jetpack_featured_media_url ?
      <Image
        alt={post?.title.rendered}
        width={1100}
        height={600}
        src={post?.jetpack_featured_media_url}
        className="object-cover min-h-600 h-600 w-full"
      /> :
      <div className="bg-gray-100 min-h-600 h-600 w-full">
        <Lottie
          height={1100}
          width={600}
          autoplay={true}
          animationData={ImagePlaceholder}
          loop={true}
        />
      </div> }
      <div className="flex items-center justify-between absolute bottom-0 p-9 w-full bg-gradient-to-t from-black/80 to-rgb(0-0-0)">
        <div className="flex flex-col items-start gap-2  ">
          <div className="flex gap-2 flex-wrap">
            {Array.isArray(categories) &&
              categories.map((category) => (
                <Link key={category.id} href={category.link}>
                  <span
                    className="text-xs px-2 py-1 bg-blue-700 text-white uppercase font-bold"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(category.name),
                    }}
                  ></span>
                </Link>
              ))}
          </div>
          <h1 className="text-4xl font-bold text-white " dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.title.rendered)}}>
          </h1>
          <div className="uppercase font-bold text-white flex flex-row flex-wrap gap-2 text-xs">
            <span>BY {post.modified_by}</span> -  <span>{dateFormatter(post.date_gmt)}</span> -
            <span>{getReadingTime(post.content.rendered)} MINS READ</span>
          </div>
        </div>
        <span className="flex flex-row gap-4">
          <FaFacebookF color="white" size={20} />
          <FaTwitter color="white" size={20} />
          <FaReddit color="white" size={20} />
        </span>
      </div>
    </div>
  );
}
