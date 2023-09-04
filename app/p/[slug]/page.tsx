import SingleContent from "@/app/[slug]/content";
import {
  fetchPages,
  fetchPosts,
  getPageBySlug,
  getPostBySlug,
} from "@/lib/wordpress";
import DOMPurify from "isomorphic-dompurify";

type Props = {
  params: {
    slug: string;
  };
};

export default async function SinglePage({ params: { slug } }: Props) {

  const page = await getPageBySlug(slug);

  console.log(page);

  return (
    <>
    <h1 className="text-4xl font-bold mb-6" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(page.title.rendered)}}></h1>
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(page.content.rendered),
      }}
    ></div>
    </>
  );
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const pages = await fetchPages();
  return pages.map((page: any) => ({
    slug: page.slug,
  }));
}
