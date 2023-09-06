import { getPostsBySearch } from "@/lib/wordpress";
import React, { ChangeEvent, useState } from "react";
import { FaTimes } from "react-icons/fa";
import SmallCard from "./cards/SmallCard";
import TinyCard from "./cards/TinyCard";
import { Post, SearchPosts } from "@/lib/types";
import SearchCard from "./cards/SearchCard";

interface ModalProps {
  handleSearchOpen: () => void;
}

interface Search {
  post: SearchPosts;
}

export default function Modal({ handleSearchOpen }: ModalProps) {
  const [posts, setPosts] = useState<SearchPosts[]>([]);
  const handleSearchQuery = async (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    let posts = await getPostsBySearch(e.target.value);
    setPosts(posts);
  };

  return (
    <div className="w-screen h-screen z-50 absolute top-0 left-0 bg-neutral-500		 flex flex-col items-center justify-start pt-40"  onKeyDown={(e) => { if(e.key === "Escape") handleSearchOpen();
    }}>
      <span onClick={handleSearchOpen} className="absolute top-0 right-0 p-10">
        <FaTimes size={30} />
      </span>
      <div className="w-3/6 flex items-start justify-start flex-col rounded gap-3">
        <input
          onChange={handleSearchQuery}
          className="w-full h-auto px-4 py-2 text-2xl md:text-5xl font-bold text-black placeholder-gray-700 bg-gray-50 border-b-2 focus:outline-none"
          placeholder="Search..."
          autoFocus
        />
        <i className="text-xs md:text-lg">
          Type above and press Enter to search. Press Esc to cancel.
        </i>
      </div>
      {posts?.length > 0 ? (
        <div className="flex flex-wrap gap-3 mt-20 mx-auto max-w-6xl p-2">
          {posts.map((post) => (
            <SearchCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
