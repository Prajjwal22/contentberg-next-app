import { SinglePost } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaLinkedin, FaTwitter } from "react-icons/fa";

interface AuthorProps {
  post: SinglePost;
}

export default function AuthorBox({ post }: AuthorProps) {
  return (
    <div className="border rounded p-4 w-full">
      <span className="text-xl font-extrabold">
        Written By {post.modified_by}{" "}
      </span>
      <div className="flex items-start justify-between gap-4 mt-5">
        <Image
          className="object-contain  rounded-full"
          src="/profile.webp"
          width={120}
          height={120}
          alt="name"
        />
        <div className="w-10/12">
          <p>
            Scott Keller is a highly skilled and experienced pool industry
            professional who has dedicated over 20 years of his life to
            perfecting the art of gunite pool design, construction, and
            maintenance.
          </p>
            <span className="flex flex-row gap-4 ">
            <Link href="https://www.facebook.com/profile.php?id=100090542671405" target="_blank" rel="nofollow"><FaFacebookF size={15} /></Link>
            <Link href="https://twitter.com/ScottKelle75983" target="_blank" rel="nofollow"><FaTwitter size={15} /></Link>
            <Link href="https://www.linkedin.com/in/scott-keller-63433526b/" target="_blank" rel="nofollow"><FaLinkedin size={15} /></Link>
          </span>
        </div>
      </div>
    </div>
  );
}
