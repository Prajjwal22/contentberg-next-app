import { BlogPosting } from "schema-dts";

export const jsonLd: BlogPosting = {
    "@type": "BlogPosting",
    headline: post?.title.rendered,
    image: post?.jetpack_featured_media_url,
    description: post?.excerpt.rendered,
    articleBody: post?.content.rendered,
    articleSection: Array.isArray(categories) && categories[0].name,
    author: post?.modified_by,
    dateModified: JSON.stringify(post?.modified),
    url: "https://loveguinitepool.com/" + post?.slug,
    inLanguage:'en-US',
    isPartOf:{
      "@type": "WebPage",
      breadcrumb :{
        "@type" : "BreadcrumbList",
        "@id": post?.link + "/#breadcrumb",
        itemListElement :{
          "@"
        }
      }
    }
  };