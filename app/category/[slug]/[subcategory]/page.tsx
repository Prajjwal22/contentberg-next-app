import CategoryPagination from "@/components/CategoryPagination";
import SectionHeader from "@/components/SectionHeader";
import { getCatIDBySlug, getPostsByCategory } from "@/lib/wordpress";
import React from "react";

type Props = {
  params: {
    subcategory: string;
  };
};

export default async function CategoryPage({ params: { subcategory } }: Props) {
  const category = await getCatIDBySlug(subcategory);

  return (
    <main className="max-w-6xl m-auto my-6 p-2">
      {/* {JSON.stringify(posts)} */}
      <SectionHeader link="" title={category.name} />
      <p>{category.description}</p>
      <CategoryPagination catID={category.id} />
    </main>
  );
}
