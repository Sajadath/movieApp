"use client";
import React from "react";
import SearchInput from "../_components/SearchInput";
import NavbarLinks from "../_components/NavbarLinks";

export default function Navbar() {
  const navbarLinksArr = [
    {
      href: "/",
      title: "Home",
    },
  ];
  return (
    <header className="fixed top-2 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-white/20 px-4 py-2 backdrop-blur-lg">
      <nav className="flex items-center gap-4 px-0 sm:px-10">
        <ul className="flex gap-4">
          {navbarLinksArr.map((ce, index) => (
            <NavbarLinks href={ce.href} key={index}>
              {ce.title}
            </NavbarLinks>
          ))}
        </ul>
        <SearchInput />
      </nav>
    </header>
  );
}
