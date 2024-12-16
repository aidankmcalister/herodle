import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Footer from "@/components/Footer";
import SocialButtons from "@/components/SocialButtons";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const marvel = localFont({
  src: "../../public/marvel-font.otf",
  variable: "--font-marvel",
});

export const metadata: Metadata = {
  title: "HERODLE",
  description: "Guess the Marvel Rivals Hero",
  openGraph: {
    images: [
      {
        url: "/embed-image.png",
        width: 1200,
        height: 630,
        alt: "HERODLE - Marvel Rivals Hero Guessing Game",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <body
        className={`${quicksand.variable} ${marvel.variable} antialiased bg-[url('/background-no-text.jpg')] bg-cover bg-center bg-fixed bg-no-repeat overflow-x-hidden`}>
        <div className="flex flex-col min-h-screen bg-black bg-opacity-75 md:bg-white md:bg-opacity-30 backdrop-blur-sm">
          <main className="flex-grow flex justify-center">
            <Providers>{children}</Providers>
          </main>
          <div className="flex justify-center mt-20 mb-0 md:mb-5 w-full">
            <Footer />
          </div>
        </div>
        <div className="fixed bottom-0 right-0 mr-4 mb-3">
          <SocialButtons />
        </div>
      </body>
    </html>
  );
}
