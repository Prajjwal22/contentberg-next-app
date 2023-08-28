import FeaturedPosts from "@/components/FeaturedPosts";
import { fetchPosts } from "@/lib/wordpress";
import TwoColGrid from "@/components/TwoColGrid";
import ThreeColGrid from "@/components/ThreeColGrid";
import MultiGrid from "@/components/MultiGrid";
import Pagination from "@/components/Pagination";

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <main className="max-w-6xl m-auto my-6 p-2">
      <FeaturedPosts posts={posts} />
      <TwoColGrid posts={posts} />
      <MultiGrid posts={posts}/>
      <ThreeColGrid posts={posts} />
    </main>
  );
}
