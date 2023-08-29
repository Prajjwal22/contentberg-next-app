"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars, FaCross, FaSearch, FaTimes } from "react-icons/fa";
import Modal from "./Modal";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false)

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

  const handleSearchOpen = (option:boolean) =>{
    setIsOpen(option)
  }

  return (
    <header className="h-20 w-full shadow-md border-t-4 md:mb-6 bg-white border-emerald-950 p-2">
      <nav className="flex flex-row items-center m-auto max-w-6xl justify-between h-full">
        <div className="block">
          <Link href="/"><Image
            className="bg-contain max-w-xs h-auto"
            src="/lgp.webp"
            alt="HHW Logo"
            width={150}
            height={90}
          /></Link>
        </div>
        <ul className="hidden md:flex flex-row gap-8">
          <li className="cursor-pointer">Home</li>
          <li>Insurance Deppreciation Waiver</li>
          <li>iOS</li>
          <li>Credit Card</li>
          <li>Bike EMI Calculator</li>
        </ul>
        <div className="ml-auto md:ml-0 mr-5" onClick={()=>handleSearchOpen(true)}>
          <FaSearch size={20}/>
        </div>
        {isOpen && <Modal handleSearchOpen={()=>handleSearchOpen(false)}/>}
        {screenWidth < 770 ? (
          <nav
            className={` absolute h-webkit-fill-available w-screen top-20 transition-all duration-500 z-50 ${
              showMenu ? "left-0" : "-left-full"
            }  flex items-center justify-around bg-black text-white`}
          >
            <ul className="flex justify-between items-stretch flex-col gap-12">
              <li className="uppercase font-bold text-4xl">Insurabce Depreciation Waiver</li>
              <li className="uppercase font-bold text-4xl">iOS</li>
              <li className="uppercase font-bold text-4xl">Credit Card</li>
              <li className="uppercase font-bold text-4xl">Bike EMI Calculator</li>
            </ul>
          </nav>
        ) : null}
        <div className="md:hidden" onClick={handleMenuOpen}>
          {!showMenu ? <FaBars size={25} /> : <FaTimes size={25} />}
        </div>
      </nav>
    </header>
  );
}
