import React from "react";
import Link from "next/link";
import { PiButterflyFill } from "react-icons/pi";

export default function Logo() {
  return (
    <div className="flex items-center justify-center">
      <Link href="/" passHref>
        <div className="flex items-center space-x-2 hover:cursor-pointer">
          <PiButterflyFill className="text-4xl text-secondary" />
          <h2 className="font-bold text-2xl	 font-inter text-secondary">
            Forms Creator
          </h2>
        </div>
      </Link>
    </div>
  );
}
