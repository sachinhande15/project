import React from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard",
};
export default function layout({ children }) {
  return (
    <main className={inter.className}>
      <Navbar></Navbar>
      {children}
    </main>
  );
}
