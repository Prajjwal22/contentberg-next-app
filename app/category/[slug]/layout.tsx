import { getCatIDBySlug, } from "@/lib/wordpress";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default function layout({ children, params }: { children: React.ReactNode; params: {slug:string} }) {
  return <article className="max-w-6xl m-auto">{children}</article>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;

  const catID = await getCatIDBySlug(slug);
  return {
    title: catID?.name + " Archives",
    description: catID?.description,
    // openGraph: {
    //   images: post?.jetpack_featured_media_url,
    // },
    // alternates: {
    //   canonical: `${process.env.WORDPRESS_SITE_URL}${post?.slug}`,
    // },
    // robots: {
    //   index: true,
    //   follow: true,
    // },
  };
}
