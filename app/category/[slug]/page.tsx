import CategoryPagination from "@/components/CategoryPagination";
import SectionHeader from "@/components/SectionHeader";
import { getCatIDBySlug } from "@/lib/wordpress";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default async function CategoryPage({ params: { slug } }: Props) {
  const category = await getCatIDBySlug(slug);

  return (
    <main className="max-w-6xl m-auto my-6 p-2">
      {/* {JSON.stringify(posts)} */}
      <SectionHeader link="" title={category.name} />
      <p>{category.description}</p>
      <CategoryPagination catID={category.id} />
    </main>
  );
}
