"use client";

import { dateFormatter, getReadingTime } from "@/lib/utils";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { FaFacebookF, FaReddit, FaTwitter } from "react-icons/fa";
import {  SinglePost } from "@/lib/types";
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

  return (
    <div className="w-full relative">
      {/* {post.jetpack_featured_media_url ? ( */}
        <Image
          alt={post?.title.rendered}
          width={900}
          height={600}
          // priority
          src={post?.jetpack_featured_media_url}
          className="object-cover h-72 md:min-h-600 md:h-600 w-full"
          sizes="(max-width: 360px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
      {/* ) : (
        <div className="bg-gray-100 min-h-600 h-600 w-full">
          <Lottie
            height={600}
            width={1100}
            autoplay={true}
            animationData={ImagePlaceholder}
            loop={true}
          />
        </div>
      )} */}
      <div className="w-full absolute top-0 left-0 p-4 text-white text-xs md:text-sm bg-gradient-to-b from-black/80 to-rgb(0-0-0) ">
        {/* {`Home >> ${
          Array.isArray(categories) && HTMLReactParser(categories[0].name)
        } >> ${HTMLReactParser(post?.title?.rendered)}`} */}

        <Link href="/">Home</Link> &gt;&gt; {Array.isArray(categories) && <Link href={`/${categories[0].link}`}>{HTMLReactParser(categories[0].name)}</Link>} &gt;&gt; {HTMLReactParser(post?.title?.rendered)}
      </div>
      <div className="flex md:gap-3 items-center justify-between absolute  bottom-0 p-4 md:p-9 w-full bg-gradient-to-t from-black/80 to-rgb(0-0-0) ">
        <div className="flex flex-col items-start gap-2 hover:-translate-y-4 ease-in-out transition-all duration-300">
          <div className="flex gap-2 flex-wrap">
            {Array.isArray(categories) &&
              categories.map((category) => (
                <Link key={category.id} href={`/${category.link}`}>
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
            className="text-xl md:text-4xl font-bold text-white "
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post?.title?.rendered),
            }}
          ></h1>
          <div className="font-bold text-white flex flex-row flex-wrap gap-2 text-xs">
            <span>
              Reviewed By <Link href="/p/author-james-atlas/">James Atlas</Link>
            </span>{" "}
            -{" "}
            <span>
              Fact Checked by{" "}
              <Link href="/p/author-jeremy-hine/">Jeremy Hine</Link>
            </span>{" "}
            - <span>{dateFormatter(post?.date_gmt)}</span> -
            <span>{readingTime} MINS READ</span>
          </div>
        </div>
        <span className="md:flex flex-row gap-4 hidden">
          <Link
            target="_blank"
            rel="noopener nofollow"
            href={`https://www.facebook.com/sharer/sharer.php?u=${post.link}`}
          >
            <FaFacebookF color="white" size={15} />
          </Link>
          <Link
            target="_blank"
            rel="noopener nofollow"
            href={`http://twitter.com/share?text=I've something about ${post.title.rendered} you may check out this &url=${post.link}`}
          >
            <FaTwitter color="white" size={15} />
          </Link>
          <Link
            target="_blank"
            rel="noopener nofollow"
            href={`https://www.reddit.com/submit?url=${post.link}&title=${post.title.rendered}`}
          >
            <FaReddit color="white" size={15} />
          </Link>
        </span>
      </div>
    </div>
  );
}
