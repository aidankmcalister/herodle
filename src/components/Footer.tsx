"use client";

import { Link } from "@nextui-org/react";

export default function Footer() {
  return (
    <footer className="text-center text-[10px] text-gray-100 bg-black/60 backdrop-blur-sm p-2 rounded-none md:rounded w-screen max-w-3xl flex flex-col items-center">
      <p>
        © {new Date().getFullYear()}{" "}
        <Link
          href="https://www.marvelrivals.com"
          isExternal
          className="text-red-500">
          Marvel Rivals
        </Link>
        . All rights reserved.
      </p>
      <p className="mt-1">
        Not affiliated with or endorsed by Marvel Rivals or associated
        companies.
      </p>
    </footer>
  );
}
