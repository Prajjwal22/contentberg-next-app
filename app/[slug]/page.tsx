import { Post } from "@/lib/types";
import { fetchPosts, fetchRankMathSEO, getPostBySlug } from "@/lib/wordpress";
import SingleTemplate from "./singletemplate";
import SingleContent from "./content";
import RelatedPosts from "@/components/RelatedPosts";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { Article } from "schema-dts";

type Props = {
  params: {
    slug: string;
  };
};

export default async function SinglePost({ params: { slug } }: Props) {
  const post = await getPostBySlug(slug);

  const schema = await fetchRankMathSEO(slug);
 
  const categories = post?._embedded?.["wp:term"]?.[0];

  const jsonLd: Article = {
    '@type': 'Article',
    headline: post?.title.rendered,
    image: post?.jetpack_featured_media_url,
    description: post?.excerpt.rendered,
    articleBody: post?.content.rendered,
    articleSection:Array.isArray(categories) && categories[0].name,
    author:post?.modified_by,
    dateModified: JSON.stringify(post?.modified),
    url:"https://loveguinitepool.com/" + post?.slug
  } 


  // console.log(post)
  if (!post) notFound();
  return (
    <div className="flex flex-col items-center ">
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
  const posts = await fetchPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
