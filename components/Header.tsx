"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars, FaCross, FaSearch, FaTimes } from "react-icons/fa";
import Modal from "./Modal";
import { fetchMenus } from "@/lib/wordpress";
import { MenuItem } from "@/lib/types";
import DOMPurify from "isomorphic-dompurify";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState<MenuItem[]>([]);

  const [hoveredParent, setHoveredParent] = useState<number | null>(null);

  const handleMenuOpen = () => {
    setShowMenu(!showMenu);
 !showMenu ?  
      document.body.classList.add("fix-scroll-bar") : document.body.classList.remove("fix-scroll-bar")
  
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
    document.body.classList.add('dfsdsd')
  }, []);

  useEffect(() => {
    const fetchNavMenu = async () => {
      const menu = await fetchMenus(11);
      setMenu(menu);
    };

    fetchNavMenu();
  }, []);

  const handleSearchOpen = (option: boolean) => {
    setIsOpen(option);
  };



  return (
    <header className="h-20 w-full shadow-md border-t-4 md:mb-6 bg-white border-emerald-950 p-2">
      <nav className="flex flex-row items-center m-auto max-w-6xl justify-between h-full">
        <div className="block">
          <Link href="/">
            <Image
              className="bg-contain h-auto"
              src="/lgp.webp"
              alt="HHW Logo"
              width={100}
              height={90}
            />
          </Link>
        </div>
        <ul className="hidden md:flex flex-row text-md w-full gap-8 justify-center">
          {menu
            .filter((item) => item.menu_item_parent === "0")
            .map((navItem: MenuItem) => {
              const childItems = menu.filter(
                (childItem) =>
                  parseInt(childItem.menu_item_parent) === navItem.ID
              );

              return (
                <li
                  key={navItem.ID}
                  className={`cursor-pointer `}
                  onMouseEnter={() => setHoveredParent(navItem.ID)}
                  onMouseLeave={() => setHoveredParent(null)}
                >
                  <Link href={navItem.url}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(navItem.title),
                      }}
                    ></span>
                  </Link>
                  {childItems.length > 0 && hoveredParent === navItem.ID && (
                    <ul className="absolute bg-white shadow-md p-4 z-50">
                      {childItems.map((childItem: MenuItem) => (
                        <li key={childItem.ID}>
                          <Link href={childItem.url}>{childItem.title}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
        </ul>

        <div
          className="ml-auto md:ml-0 mr-5"
          onClick={() => handleSearchOpen(true)}
        >
          <FaSearch className="cursor-pointer" size={20} />
        </div>
        {isOpen && <Modal handleSearchOpen={() => handleSearchOpen(false)}/>}
        {screenWidth < 770 ? (
          <nav
            className={` absolute h-webkit-fill-available w-screen top-20 transition-all duration-500 z-50 ${
              showMenu ? "left-0" : "-left-full"
            }  flex items-center justify-around bg-black text-white`}
          >
            <ul className="flex justify-between items-stretch flex-col gap-12">
              {menu
            .filter((item) => item.menu_item_parent === "0")
            .map((navItem: MenuItem) => {
              const childItems = menu.filter(
                (childItem) =>
                  parseInt(childItem.menu_item_parent) === navItem.ID
              );

              return (
                <li
                  key={navItem.ID}
                  className="uppercase font-bold text-4xl"
                  onMouseEnter={() => setHoveredParent(navItem.ID)}
                  onMouseLeave={() => setHoveredParent(null)}
                >
                  <Link href={navItem.url}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(navItem.title),
                      }}
                    ></span>
                  </Link>
                </li>
              );
            })}
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
