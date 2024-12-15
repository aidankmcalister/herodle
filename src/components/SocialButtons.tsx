"use client";

import { Link } from "@nextui-org/react";
import Image from "next/image";

export default function SocialButtons() {
  return (
    <Link
      href="https://buymeacoffee.com/aidanmcalister"
      isExternal
      className="hover:scale-105 transition-all">
      <Image
        src="/bmc-button.png"
        alt="Buy Me a Coffee"
        width={150}
        height={150}
      />
    </Link>
  );
}
