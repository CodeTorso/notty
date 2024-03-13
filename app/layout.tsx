import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notty",
  description: "Easy note taking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {children}
      </body>
    </html>
  );
}

function Navbar() {
  return (
    <div className="flex gap-5">
      <Link href="/">Home</Link>
      <Link href="/notes">Notes</Link>
    </div>
  );
}
