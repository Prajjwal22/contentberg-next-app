"use client";

import { Post } from "@/lib/types";
import {
  fetchPosts,
  fetchTotalPostsCount,
  getPaginatedPosts,
} from "@/lib/wordpress";
import React, { useEffect, useState } from "react";
import SmallCard from "./cards/SmallCard";

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const perPage = 9;

  useEffect(() => {
    const fetchPaginatedPosts = async () => {
      setLoading(true);
      const posts = await getPaginatedPosts(currentPage, perPage);
      setPosts(posts);
      const totalItems = await fetchTotalPostsCount();
      setTotalPages(Math.ceil(totalItems / perPage));
      setLoading(false);
      console.log(currentPage);
    };
    fetchPaginatedPosts();
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  console.log(posts);
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-5">
        {loading
          ? "Loading...."
          : posts.map((post) => <SmallCard key={post.id} post={post} />)}
      </div>
      <div className="m-auto mt-10 text-md flex gap-3 items-center justify-center">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-blue-400 text-white px-3 py-1 cursor-pointer rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-blue-400 text-white px-3 py-1 cursor-pointer rounded"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
