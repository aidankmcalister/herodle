"use client";

import { Link } from "@nextui-org/react";

export default function Footer() {
  return (
    <footer className="text-center text-sm text-default-400 bg-black/80 backdrop-blur-sm p-6 rounded-lg shadow-lg w-screen max-w-7xl flex flex-col items-center justify-center">
      <p>
        All rights reserved. © {new Date().getFullYear()}{" "}
        <Link
          href="https://www.marvelrivals.com"
          isExternal
          className="text-red-700">
          Marvel Rivals
        </Link>
        . All images, names, logos, and other intellectual property are
        trademarks of their respective owners.
      </p>
      <p className="mt-2">
        This website is not affiliated with, endorsed by, or officially
        connected to Marvel Rivals or any associated companies.
      </p>
      <p className="mt-2">
        All other trademarks and copyrights are the property of their respective
        owners.
      </p>
    </footer>
  );
}
