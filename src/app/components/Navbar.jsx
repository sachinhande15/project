import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <>
      <nav>
        <div className=" bg-transparent flex flex-row justify-between m-3">
          <div className="m-2 p-2">
            <Link
              href={"/"}
              className="text-red-600 text-center text-2xl font-sans font-bold"
            >
              Platinum Parking
            </Link>
          </div>
          <div className="flex flex-row justify-between ">
            <div className="text-center m-2 font-sans font-bold">
              <button className="m-2 bg-blue-400 text-white font-sans cursor-pointer text-center border rounded-md p-2">
                Add vehicle
              </button>
            </div>
            <div className=" m-2 flex flex-row justify-center">
              <input
                type="text"
                className="border rounded-xl p-2 m-2 w-full text-black"
                placeholder="Vechile Number e.g. MM-12 AB 1234"
              ></input>
              <button className="bg-blue-400 m-2 font-sans font-semibold cursor-pointer text-center border rounded-xl p-2">
                Search
              </button>
              <button className="bg-blue-400 m-2 font-sans font-semibold cursor-pointer text-center border rounded-xl p-2">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
