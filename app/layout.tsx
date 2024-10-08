import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Appbar from "./components/Appbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exchange App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Appbar />
        <main
          className="mt-[4.3rem] flex flex-col items-center justify-between overflow-y-auto"
          style={{ height: "calc(100vh - 4.3rem)" }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
