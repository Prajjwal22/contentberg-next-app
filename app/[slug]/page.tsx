import { fetchPosts, getPostBySlug } from "@/lib/wordpress";
import SingleTemplate from "./singletemplate";
import SingleContent from "./content";
import RelatedPosts from "@/components/RelatedPosts";
import { notFound } from "next/navigation";
import { Article, BlogPosting } from "schema-dts";

type Props = {
  params: {
    slug: string;
  };
};

export default async function SinglePost({ params: { slug } }: Props) {
  const post = await getPostBySlug(slug);
  const categories = post?._embedded?.["wp:term"]?.[0];
  const jsonLd: BlogPosting = {
    "@type": "BlogPosting",
    headline: post?.title.rendered,
    image: post?.jetpack_featured_media_url,
    description: post?.excerpt.rendered,
    articleBody: post?.content.rendered,
    articleSection: Array.isArray(categories) && categories[0].name,
    dateModified: JSON.stringify(post?.modified),
    url: "https://loveguinitepool.com/" + post?.slug,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      "@id":
        post?.author_info?.author_link ||
        process.env.WORDPRESS_SITE_URL + "/p/about-us",
      name: post?.author_info?.display_name || "Editorial Staff",
      url:
        post?.author_info?.author_link ||
        process.env.WORDPRESS_SITE_URL + "/p/about-us",
      image: {
        "@type": "ImageObject",
        "@id": "/profile.webp",
        url: "/profile.webp",
        caption: post?.author_info?.display_name || "Editorial Staff",
        inLanguage: "en-US",
      },
    },
    publisher: {
      "@type": "Organization",
      "@id": process.env.WORDPRESS_SITE_URL,
      name: process.env.SITE_TITLE,
      url: process.env.WORDPRESS_SITE_URL,
      logo: {
        "@type": "ImageObject",
        "@id": process.env.WORDPRESS_SITE_URL + "#logo",
        url: "/lgp.webp",
        contentUrl: "/lgp.webp",
        caption: process.env.SITE_TITLE,
        inLanguage: "en-US",
      },
    },
    isPartOf: {
      "@type": "WebPage",
      breadcrumb: {
        "@type": "BreadcrumbList",
        "@id": post?.link + "/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "Thing",
              "@id": process.env.WORDPRESS_SITE_URL,
              name: "Home",
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "Thing",
              "@id":
                process.env.WORDPRESS_SITE_URL +
                "category/" +
                ((Array.isArray(categories) && categories[0].slug) ||
                  "cateslug"),
              name: Array.isArray(categories) && categories[0].name,
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "Thing",
              "@id": post?.link,
              name: post?.title.rendered,
            },
          },
        ],
      },
    },
  };

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
