"use client";

import AuthorBox from "@/components/AuthorBox";
import { SinglePost } from "@/lib/types";
import { getReadingTime } from "@/lib/utils";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { FaCopy, FaEnvelope, FaFacebookF, FaTwitter } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

interface SingleContentProps {
  post: SinglePost;
}

export default function SingleContent({ post }: SingleContentProps) {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [toc, setToc] = useState<JSX.Element[]>([]);

  const router = useRouter();

  useEffect(() => {
    const parsedContent = DOMPurify.sanitize(post.content.rendered);
    const contentDiv = document.createElement("div");
    contentDiv.innerHTML = parsedContent;

    const headings = contentDiv.querySelectorAll("h1, h2");
    const links = Array.from(headings).map((heading, index) => {
      const headingText = heading.textContent || "";
      const linkId = String(heading.textContent).split(" ").join("_");

      return (
        <li
          className="mb-2 cursor-pointer"
          key={linkId}
          onClick={() => {
            router.push(`#${linkId}`);
          }}
        >
          {/* <Link href={`#${linkId}`}> */}
          {headingText}
          {/* </Link> */}
        </li>
      );
    });
    // console.log(headings);

    setToc(links);
  }, [post.content.rendered]);

  useEffect(() => {
    document.getElementById("toc_container")?.remove();

    window.addEventListener("scroll", () => {
      const scrollingHeight = document.documentElement.scrollTop;
      const calcScroll =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const totalScroll = (scrollingHeight / calcScroll) * 100;

      setScrollPosition(totalScroll);
    });
  }, []);

  const readingTime = useMemo(
    () => getReadingTime(post?.content?.rendered),
    [post]
  );

  const path = usePathname();
  return (
    <section className="main-content mt-5 p-2">
      <div className="grid grid-cols-3 justify-items-center">
        <div className="col-span-1 flex-col items-center gap-4 sticky w-9/12 top-1 h-fit hidden md:flex">
          <div className="flex flex-row items-center gap-2">
            <Image
              src="/profile.webp"
              className="rounded-full"
              height={60}
              width={60}
              alt="rp"
            />
            <div className="flex flex-col">
              <span className="text-bold text-sm">
                <Link href="/p/about-us">{post.modified_by}</Link>
              </span>
              <span className="text-gray-500 text-sm">Content Publisher</span>
            </div>
          </div>
          <span className="text-gray-500 text-sm mb-2">
            Scott Keller is a highly skilled and experienced pool industry
            professional who has dedicated over 20 years of his life to
            perfecting the art of gunite pool design, construction, and
            maintenance.
          </span>
          <div className="w-full rounded h-1 flex flex-col ">
            <div className="w-full rounded h-1 flex flex-col items-center bg-purple-300 relative"></div>
            <span
              style={{ width: `${scrollPosition}%` }}
              className="rounded h-1 bg-purple-600 absolute left-0 ease-in-out "
            ></span>
          </div>
          <span className="flex items-center gap-3">
            <FiClock size={25} />
            {`${readingTime} minutes read`}
          </span>
          <div className="border-t-2 border-gray-100 w-full p-2 flex flex-col items-center">
            <span className="text-md font-bold my-3 ">Table of Content</span>
            <div className="w-full list-decimal text-gray-600 h-96 overflow-scroll">
              {toc}
            </div>
            <div className="mt-5 font-bold">Share it with your friends:</div>
            <span className="flex items-center gap-3 mt-3">
              <Link
                target="_blank"
                rel="noopener nofollow"
                href={`https://www.facebook.com/sharer/sharer.php?u=${post.link}`}
              >
                {" "}
                <FaFacebookF
                  className="text-blue-500 cursor-pointer"
                  size={20}
                />
              </Link>
              <Link
                target="_blank"
                rel="noopener nofollow"
                href={`mailto:subject=Check%20This%20Out&body=Hey%20there,%0A%0ACheck%20out%20this%20cool%20website:%20h${post.link}`}
              >
                {" "}
                <FaEnvelope className="text-red-400 cursor-pointer" size={20} />
              </Link>
              <Link
                target="_blank"
                rel="noopener nofollow"
                href={`http://twitter.com/share?text=I've something about ${post.title.rendered} you may check out this &url=${post.link}`}
              >
                {" "}
                <FaTwitter className="text-blue-400 cursor-pointer" size={20} />
              </Link>
              <FaCopy
                onClick={() => {
                  navigator.clipboard.writeText(post.link);
                }}
                className="text-slate-500 cursor-pointer"
                size={20}
              />
            </span>
          </div>
        </div>

        <div
          className="md:col-span-2 col-span-3 text-gray-600 leading-8 list-inside entry-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content.rendered),
          }}
        ></div>
      </div>
      <div className="max-w-3xl m-auto my-2">
        <AuthorBox post={post} />
      </div>
    </section>
  );
}
