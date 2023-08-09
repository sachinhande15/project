"use client";
import React from "react";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
import axios from "axios";
// export const metadata = {
//   title: "logout",
// };
export default function page() {
  // const handleLogout = async () => {
  //   const res = await axios.get("/api/logout");
  //   if (res.status == 200) {
  //     const data = await res.data;
  //     toast.success(data.message, toast.POSITION.TOP_CENTER);
  //   }
  // };
  useEffect(() => {
    // signOut();
  }, []);

  return (
    <>
      <div className=" flex-col flex justify-center content-center m-5">
        <h1 className="text-center font-semibold text-lg mt-48">
          You have been successfully logout from the site.
        </h1>
        <div className="mx-auto mt-10 flex flex-row justify-center w-full">
          <span className="text-center text-sm m-4 ">
            click here to login again
          </span>

          <Link href={"/"} className="m-2">
            <button className="inline-flex items-center bg-green-500 border-0 py-1 px-3 focus:outline-none hover:bg-green-700 hover text-white rounded text-base mt-4 md:mt-0">
              Login
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
