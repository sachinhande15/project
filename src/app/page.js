import React from "react";
import SearchBar from "@/components/SearchBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// export const metadata = {
//   title: "login",
// };
export default function page() {
  return (
    <main className="h-screen gap-10 md:gap-4 flex flex-col justify-center ">
      <Navbar></Navbar>
      <SearchBar></SearchBar>
      <Footer></Footer>
    </main>
  );
}
