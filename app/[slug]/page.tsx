import { Post } from "@/lib/types";
import { fetchPosts, getPostBySlug } from "@/lib/wordpress";
import SingleTemplate from "./singletemplate";
import SingleContent from "./content";
import RelatedPosts from "@/components/RelatedPosts";
import { notFound } from "next/navigation"


type Props = {
  params: {
      slug: string
  }
}


export default async function SinglePost({ params: { slug } }: Props) {

  const post = await getPostBySlug(slug)

  if (!post) notFound()
  const categories = post?._embedded?.["wp:term"]?.[0];
  return (
    <div className="flex flex-col items-center ">
      {/* {JSON.stringify(post)} */}
      <SingleTemplate post={post} />
      <SingleContent post={post} />
      {Array.isArray(categories) && <RelatedPosts category={categories[0]} />}
      {/* <div id="next-post">{allPosts.map(post => <><SingleTemplate post={post} />
      <SingleContent post={post} />
      {Array.isArray(categories) && <RelatedPosts category = {categories[0]}/>}</> )}
      
      </div> */}
    </div>
  );
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = await fetchPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
