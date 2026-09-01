import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";

export const metadata: Metadata = {
  metadataBase: new URL('https://forma-studio.com'),
  title: "FORMA — Interior Design Studio",
  description: "Spaces designed to outlive the moment. Modern interior design studio.",
  openGraph: {
    title: "FORMA — Interior Design Studio",
    description: "Spaces designed to outlive the moment.",
    images: [{ url: "/images/hero-1.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden selection:bg-[#1A1A1A] selection:text-white">
        <SmoothScroll>
          <Cursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
