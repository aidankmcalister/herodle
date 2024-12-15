import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/Providers";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const marvel = localFont({
  src: "../../public/marvel-font.otf",
  variable: "--font-marvel",
});

export const metadata: Metadata = {
  title: "Herodle",
  description: "Guess the Marvel Rivals Hero",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${marvel.variable} antialiased`}>
        <div className="flex justify-center min-h-screen">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
