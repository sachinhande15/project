import React from "react";
import SearchBar from "@/components/SearchBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// export const metadata = {
//   title: "login",
// };
export default async function page() {
  return (
    <main className="bg-slate-100 h-screen flex flex-col">
      <Navbar></Navbar>
      <SearchBar></SearchBar>
      <Footer></Footer>
    </main>
  );
}
