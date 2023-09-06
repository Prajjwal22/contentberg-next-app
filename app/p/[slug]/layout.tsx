import { getPageBySlug } from "@/lib/wordpress";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <section className="max-w-4xl m-auto p-4 leading-7">{children}</section>;
}

type Props = {
    params: {
      slug: string;
    };
  };
  


export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    const slug = params.slug;
    console.log(slug)
  
    const page = await getPageBySlug(slug)
    return {
      title: page?.title.rendered + " - " + process.env.SITE_TITLE,
      description: page?.excerpt.rendered,
      // openGraph: {
      //   images: post?.jetpack_featured_media_url,
      // },
      alternates: {
        canonical: `${process.env.WORDPRESS_SITE_URL}${page?.slug}`,
      },
      // robots: {
      //   index: true,
      //   follow: true,
      // },
    };
  }
  