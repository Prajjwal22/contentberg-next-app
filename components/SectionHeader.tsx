import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import React from "react";

interface CategoryName {
  title: string;
  link: string;
}

export default function SectionHeader({ title, link }: CategoryName) {

  return (
    <div className="flex flex-row items-center justify-between my-6 border-b w-full">
      <span className="text-2xl font-bold" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(title)}}></span>
      <span className="text-md text-gray-400">
        <Link href={`${link}`}>View All</Link>
      </span>
    </div>
  );
}
