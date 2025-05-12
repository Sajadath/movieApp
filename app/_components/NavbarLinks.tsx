import Link from "next/link";
import React, { ReactNode, useState } from "react";

export default function NavbarLinks({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <li className="relative h-fit w-fit">
      <div
        className={`${hovered ? "scale-100" : "scale-0"} absolute top-full right-0 left-0 h-1 origin-center bg-white transition-all duration-300`}
      ></div>
      <Link
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        href={href}
        className="font-bold"
      >
        {children}
      </Link>
    </li>
  );
}
