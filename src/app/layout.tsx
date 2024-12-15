import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Footer from "@/components/Footer";

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
      <body
        className={`${quicksand.variable} ${marvel.variable} antialiased bg-[url('/background.png')] bg-cover bg-center bg-fixed bg-no-repeat overflow-x-hidden`}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow flex justify-center">
            <Providers>{children}</Providers>
          </main>
          <div className="flex justify-center mt-20 mb-5 w-full">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
