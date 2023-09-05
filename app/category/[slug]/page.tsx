
import CategoryPagination from "@/components/CategoryPagination";
import SectionHeader from "@/components/SectionHeader";
import ThreeColGrid from "@/components/ThreeColGrid";
import { Post } from "@/lib/types";
import { getCatIDBySlug, getPostsByCategory } from "@/lib/wordpress";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default async function CategoryPage({ params: { slug } }: Props) {
  const category = await getCatIDBySlug(slug);

  return <main className="max-w-6xl m-auto my-6 p-2">
    {/* {JSON.stringify(posts)} */}
    <SectionHeader link="" title={category.name}/>
     <CategoryPagination catID={category.id}/>
  </main>;
}
