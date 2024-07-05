import React from "react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href={"/"}
      className="font-bold text-4xl	 bg-gradient-to-r from-sky-400 to-sky-500 text-transparent bg-clip-text"
    >
      Forms Creator
    </Link>
  );
}
