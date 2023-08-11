"use client";
import AddVehicle from "@/components/AddVehicle";
import Navbar from "@/components/Navbar";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function DashBoard() {
  const { data, status } = useSession();

  return (
    <>
      <main className=" flex flex-col gap-10 min:h-screen bg-gradient-to-r from-indigo-200 via-green-200 to-red-100">
        <Navbar></Navbar>
        {status == "authenticated" && data !== null && (
          <>
            <h1 className="text-2xl font-sans font-bold">
              Welcome {data?.user?.email}
            </h1>
          </>
        )}

        <AddVehicle></AddVehicle>
      </main>
    </>
  );
}
