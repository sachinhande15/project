"use client";
import axios from "axios";
import React from "react";

export default function UserList({ list }) {
  /*
   * Delete user from the database
   */
  const deleteUser = async (e, id) => {
    try {
      e.preventDefault();
      const res = await axios.delete(`/api/users/${id}`, {
        next: {
          revalidate: 10,
        },
      });
      const data = await res.json();
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="py-6 sm:py-8 lg:py-12 bg-green-300 h-fit">
        <div className=" px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              User List
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-4 h-full">
            {list.map((user) => {
              return (
                <>
                  <div key={user._id}>
                    <div className="mb-2 h-48 overflow-hidden p-2 rounded-lg bg-gray-100 shadow-lg sm:mb-4 sm:h-60 md:h-80">
                      <div className="font-bold m-3 md:text-lg">
                        {user.username}
                      </div>
                      <div className="font-bold m-3 md:text-lg">
                        {`Mobile Number ${user.mobile}`}
                      </div>
                      <div className="font-bold md:text-lg m-3">
                        {user.email}
                      </div>
                      <div className="font-bold md:text-lg m-3">
                        {`Company Name ${user.company}`}
                      </div>
                    </div>
                    <div className="font-bold md:text-lg mt-5 inline-flex gap-32">
                      <button className="inline-flex items-center bg-green-500 border-0 py-1 px-3 focus:outline-none hover:bg-green-700 hover text-white rounded text-base mt-4 md:mt-0 leading-loose">
                        Edit
                      </button>

                      <button
                        onClick={(e) => deleteUser(e, user._id)}
                        className="inline-flex items-center bg-red-500 border-0 py-1 px-3 focus:outline-none hover:bg-green-700 hover text-white rounded text-base mt-4 md:mt-0"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
