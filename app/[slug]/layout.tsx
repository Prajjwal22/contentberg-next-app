import { Post } from "@/lib/types";
import { getPostBySlug } from "@/lib/wordpress";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <article className="max-w-6xl m-auto">{children}</article>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;

  const post = await getPostBySlug(slug);

  return {
    title: post?.title.rendered,
    description: post?.excerpt.rendered,
    openGraph: {
      images: post?.jetpack_featured_media_url,
    },
    alternates: {
      canonical: `${process.env.WORDPRESS_SITE_URL}${post?.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
