'use client'

import { SinglePost } from "@/lib/types";
import { getReadingTime } from "@/lib/utils";
import DOMPurify from 'isomorphic-dompurify';
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";

interface SingleContentProps {
  post: SinglePost;
}

export default function SingleContent({ post }: SingleContentProps) {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [toc, setToc] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const parsedContent = DOMPurify.sanitize(post.content.rendered);
    const contentDiv = document.createElement("div");
    contentDiv.innerHTML = parsedContent;

    const headings = contentDiv.querySelectorAll("h1, h2");
    const links = Array.from(headings).map((heading, index) => {
      const headingText = heading.textContent || "";
      const linkId = String(heading.textContent).split(" ").join("_");

      return (
        <li className="mb-1" key={linkId}>
          <Link href={`#${linkId}`}>{headingText}</Link>
        </li>
      );
    });
    console.log(headings);

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
  return (
    <section className="main-content mt-5 p-2">
      <div className="grid grid-cols-3 justify-items-center">
        <div className="col-span-1 flex-col items-center gap-4 sticky w-9/12 top-1 h-screen hidden md:flex">
          <div className="flex flex-row items-center gap-2">
            <Image
              src="/profile.webp"
              className="rounded-full"
              height={60}
              width={60}
              alt="rp"
            />
            <div className="flex flex-col">
              <span className="text-bold text-sm">{post.modified_by}</span>
              <span className="text-gray-500 text-sm">Content Publisher</span>
            </div>
          </div>
          <span className="text-gray-500 text-sm mb-2">
            JavaScript developer focused mostly on React. Big fan of modern
            web-development technological solutions. Technical blogger, team
            player, and gym enthusiast.
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
            {`${getReadingTime(post.content.rendered)} minutes read`}
          </span>
          <div className="border-t-2 border-gray-100 w-full p-2 flex flex-col items-center">
            <span className="text-md font-bold my-3 ">Table of Content</span>
            <div className="w-full list-decimal text-gray-600 h-96 overflow-scroll">
              {toc}
            </div>
          </div>
        </div>

        <div
          className="md:col-span-2 col-span-3 text-lg text-gray-600 leading-8 list-inside"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content.rendered),
          }}
        ></div>
      </div>
    </section>
  );
}
