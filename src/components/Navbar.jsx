"use client";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
export default function Navbar() {
  const { data, status } = useSession();
  const handleLogout = () => {};
  return (
    <>
      <header className=" md:h-14 m-2 pl-2 bg-transparent shadow-xl shadow-green-400 ">
        <div className="sticky flex flex-col place-items-center justify-between md:max-h-80 md:max-w-screen-xl md:flex-row md:justify-self-auto">
          <div className="text-center font-sans text-4xl font-bold tracking-wider">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <div className="mt-2 font-sans font-extrabold tracking-wider text-violet-700 sm:text-2xl md:text-center lg:text-4xl">
            Platinum TechnoPark
          </div>
          <div className="my-2 text-center">
            <ul className="flex flex-col justify-between gap-2 font-sans font-semibold md:flex-row">
              {status == "authenticated" && data !== null ? (
                <>
                  <li className="m-1 text-justify hover:cursor-pointer">
                    <button
                      onClick={() => signOut()}
                      className=" cursor-pointer text w-[100px] rounded-md border bg-slate-200 p-1 tracking-normal hover:cursor-pointer hover:bg-green-300"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="m-1 text-justify hover:cursor-pointer">
                    <Link href={"/signup"}>
                      <button className="text w-[100px] rounded-md border bg-slate-200 p-1 tracking-normal hover:cursor-pointer hover:bg-green-300">
                        Signup
                      </button>
                    </Link>
                  </li>
                  <li className="m-1 text-justify hover:cursor-pointer">
                    <Link href={"/login"}>
                      <button className="text w-[100px] rounded-md border bg-slate-200 p-1 tracking-normal hover:cursor-pointer hover:bg-green-300">
                        Login
                      </button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
