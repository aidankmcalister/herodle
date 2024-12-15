"use client";

import { Button, Link } from "@nextui-org/react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="text-center text-xs text-default-400 bg-black/80 backdrop-blur-sm p-3 rounded-lg shadow-lg w-screen max-w-3xl flex flex-col items-center justify-center">
      <p>
        All rights reserved. © {new Date().getFullYear()}{" "}
        <Link
          href="https://www.marvelrivals.com"
          isExternal
          className="text-red-700 text-xs">
          Marvel Rivals
        </Link>
      </p>
      <p className="mt-1">
        All images, names, logos, and other intellectual property are trademarks
        of their respective owners.
      </p>
      <p className="mt-1">
        This website is not affiliated with, endorsed by, or officially
        connected to Marvel Rivals or any associated companies.
      </p>
      <p className="mt-1">
        All other trademarks and copyrights are the property of their respective
        owners.
      </p>
    </footer>
  );
}
