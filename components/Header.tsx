"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars, FaCross, FaTimes } from "react-icons/fa";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);

  const handleMenuOpen = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);

      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <header className="h-20 w-full shadow-md border-t-4 mb-6 bg-white border-emerald-950">
      <div className="flex flex-row items-center m-auto max-w-6xl justify-between h-full">
        <div className="block">
          <Link href="/"><Image
            className="bg-contain max-w-xs h-auto"
            src="/lgp.webp"
            alt="HHW Logo"
            width={150}
            height={100}
          /></Link>
        </div>
        <ul className="hidden md:flex flex-row gap-8">
          <li className="cursor-pointer">Home</li>
          <li>News</li>
          <li>Status</li>
          <li>Finance</li>
        </ul>
        {screenWidth < 770 ? (
          <nav
            className={` absolute h-webkit-fill-available w-screen top-20 transition-all duration-500 ${
              showMenu ? "left-0" : "-left-full"
            }  flex items-center justify-around bg-black text-white`}
          >
            <ul className="flex justify-between items-stretch flex-col gap-12">
              <li className="uppercase font-bold text-5xl">Home</li>
              <li className="uppercase font-bold text-5xl">News</li>
              <li className="uppercase font-bold text-5xl">Status</li>
              <li className="uppercase font-bold text-5xl">Finance</li>
            </ul>
          </nav>
        ) : null}
        <div className="md:hidden" onClick={handleMenuOpen}>
          {!showMenu ? <FaBars size={25} /> : <FaTimes size={25} />}
        </div>
      </div>
    </header>
  );
}
