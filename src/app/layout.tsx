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
        <div
          className="flex flex-col min-h-screen"
          style={{ backdropFilter: "blur(3px)" }}>
          <main className="flex-grow flex justify-center">
            <Providers>{children}</Providers>
          </main>
          <div className="flex justify-center mt-20 mb-5 w-full">
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
