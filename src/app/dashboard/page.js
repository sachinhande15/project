import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import AddVehicle from "@/components/AddVehicle";
import Navbar from "@/components/Navbar";
import React from "react";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Dashboard",
};
export default async function DashBoard() {
  const session = await getServerSession(authOptions);
  console.log(session?.user);
  if (!session) return redirect("/login");
  return (
    <>
      <main className=" flex flex-col gap-10 min:h-screen ">
        <Navbar></Navbar>
        {session ? (
          <>
            <h1 className="text-2xl font-sans font-bold">
              Welcome {session?.user?.name}
            </h1>
          </>
        ) : (
          ""
        )}
        <AddVehicle></AddVehicle>
      </main>
    </>
  );
}
