import React from "react";

export default function Profile() {
  return (
    <>
      <div className="grid  xl:grid-cols-4 sm:grid-cols-2 md:grid-cols-4 gap-x-4 ">
        <div className="bg-red-500 w-[200px] h-[200px] "></div>
        <div className="bg-green-500 w-[200px] h-[200px]"></div>
        <div className="bg-yellow-500 w-[200px] h-[200px]"></div>
        <div className="bg-gray-500 w-[200px] h-[200px]"></div>
        <div className="bg-sky-500 w-[200px] h-[200px]"></div>
      </div>
    </>
  );
}
