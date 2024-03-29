import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Nav from "@/components/Nav";
import provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "promptopia",
  description: "Discover and share AI prompts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <body className={inter.className}>{children}</body> */}
      <body>
        <div className="main">
          <div className="gradient  " />
        </div>
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}
