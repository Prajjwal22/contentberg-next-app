"use client";
import { Post, SinglePost } from "@/lib/types";
import { fetchPosts, getPostBySlug } from "@/lib/wordpress";
import React, { useEffect, useState } from "react";
import SingleTemplate from "./singletemplate";
import DOMPurify from "dompurify";
import SingleContent from "./content";
import RelatedPosts from "@/components/RelatedPosts";

export default function SinglePost({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<{
    title: { rendered: string };
    id: number;
    slug: string;
    jetpack_featured_media_url: string;
    content: { rendered: string };
    modified_by: string;
    date_gmt: Date;
    _embedded: {
      "wp:term": Array<{
        id: number;
        link: string;
        name: string;
        slug: string;
      }>;
    };
  }>({
    title: { rendered: "" },
    id: 0,
    slug: "",
    content: { rendered: "" },
    jetpack_featured_media_url: "",
    modified_by: "",
    date_gmt: new Date(),
    _embedded: {
      "wp:term": [{ id: 0, link: "", name: "", slug: "" }],
    },
  });
  useEffect(() => {
    const fetchPostBySlug = async () => {
      let data = await getPostBySlug(params.slug);
      setPost(data[0]);
    };
    fetchPostBySlug();
  }, [params.slug]);

  const [allPosts, setAllPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchNextPosts = async () => {
      let nextPosts = await fetchPosts();
      setAllPosts(nextPosts);
    };
    fetchNextPosts();
  }, []);

  const categories = post._embedded?.["wp:term"]?.[0];
  return (
    <div className="flex flex-col items-center ">
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
