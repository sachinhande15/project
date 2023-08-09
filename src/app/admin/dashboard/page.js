"use client";
import Spinner from "@/components/Spinner";
import UserList from "@/components/UserList";
import useSWR from "swr";
// import { useState } from "react";
/*
 * Method helps us to fetch all users data from the database
 */
const fetcher = async () => {
  const res = await fetch("/api/users", {
    next: {
      revalidate: 20,
    },
  });
  const data = await res.json();
  return data;
};

export default function DashBoard() {
  const { data, error, isLoading } = useSWR("users", fetcher);
  if (error) return <div>failed to load data</div>;
  // if (isLoading) return setSpinner(true);
  return (
    <>
      <main className="max-xl:h-full">
        <div className="flex justify-center items-center mt-14">
          {isLoading ? <Spinner></Spinner> : ""}
        </div>

        {data ? (
          <UserList list={data}></UserList>
        ) : (
          <div className="text-center font-sans font-bold text-3xl ">
            No user present
          </div>
        )}
      </main>
    </>
  );
}
