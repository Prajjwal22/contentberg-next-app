"use client";

import { dateFormatter, getReadingTime } from "@/lib/utils";
import DOMPurify from "isomorphic-dompurify";
import Lottie from "lottie-react";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { FaFacebookF, FaReddit, FaTwitter } from "react-icons/fa";
import ImagePlaceholder from "../../lottie/animation_llncsb4x.json";
import { Post, SinglePost, WpTerm } from "@/lib/types";
import HTMLReactParser from "html-react-parser";

interface SinleContentProps {
  post: SinglePost;
}

export default function SingleTemplate({ post }: SinleContentProps) {

  const readingTime = useMemo(
    () => getReadingTime(post?.content?.rendered),
    [post]
  );

  const categories = post._embedded?.["wp:term"]?.[0];

  // console.log(post);
  return (
    <div className="w-full relative">
      {post.jetpack_featured_media_url ? (
        <Image
          alt={post?.title.rendered}
          width={1100}
          height={600}
          // priority
          src={post?.jetpack_featured_media_url}
          className="object-cover h-72 md:min-h-600 md:h-600 w-full"
        />
      ) : (
        <div className="bg-gray-100 min-h-600 h-600 w-full">
          <Lottie
            height={600}
            width={1100}
            autoplay={true}
            animationData={ImagePlaceholder}
            loop={true}
          />
        </div>
      )}
      <div className="w-full absolute top-0 left-0 p-4 text-white text-sm bg-gradient-to-b from-black/80 to-rgb(0-0-0) ">
        {`Home >> ${Array.isArray(categories) && HTMLReactParser(categories[0].name)} >> ${HTMLReactParser(post?.title?.rendered)}`}
      </div>
      <div className="flex items-center justify-between absolute  bottom-0 p-9 w-full bg-gradient-to-t from-black/80 to-rgb(0-0-0) ">
        <div className="flex flex-col items-start gap-2 hover:-translate-y-4 ease-in-out transition-all duration-300">
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
          <h1
            className="text-2xl md:text-4xl font-bold text-white "
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post?.title?.rendered),
            }}
          ></h1>
          <div className="uppercase font-bold text-white flex flex-row flex-wrap gap-2 text-xs">
            <span>Reviewed By James Atlas</span> -{" "}
            <span>Fact checked by Jeremy Hine</span> -{" "}
            <span>{dateFormatter(post?.date_gmt)}</span> -
            <span>{readingTime} MINS READ</span>
          </div>
        </div>
        <span className="flex flex-row gap-4">
          <FaFacebookF color="white" size={15} />
          <FaTwitter color="white" size={15} />
          <FaReddit color="white" size={15} />
        </span>
      </div>
    </div>
  );
}
