"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
export default function DashBoard() {
  const labels = [
    "Employee Name",
    "Company Name",
    "Mobile Number",
    "Vechile Number",
  ];
  const [search, setSearch] = useState("");
  const [userData, setuserData] = useState([]);

  //fetch all users data from server
  const fetchData = async (search) => {
    try {
      const res = await axios.get(`api/users?vechileNumber=${search}`);
      const data = await res.data;
      const user = data.user;
      console.log(user);
      // let userFound = user.find(() => user.name === search);
      // console.log(userFound);
      setuserData(user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, []);
  const handleOnChange = (e) => {
    let veNumber = e.target.value.toUpperCase();
    setSearch(veNumber);
  };

  const searchVechileDetails = () => {
    console.log(search);
    fetchData(search);
  };
  return (
    <div className="flex flex-col justify-items-center items-center w-1/3 h-full ">
      <div className="inline-flex w-full ">
        <input
          type="text"
          className="border rounded-3xl p-2 m-2 w-full"
          value={search}
          placeholder="Vechile Number e.g. MM-12 AB 1234"
          onChange={handleOnChange}
        ></input>
        <button
          className=" m-2 text-black font-sans font-semibold  
        cursor-pointer text-center border rounded-3xl p-2 tracking-widest hover:bg-green-500"
          onClick={searchVechileDetails}
        >
          Search
        </button>
        <button
          className="bg-green-500 m-2 text-black font-sans font-semibold  
        cursor-pointer text-center border rounded-3xl p-2 tracking-widest hover:bg-transparent"
        >
          Add
        </button>
      </div>

      <div className="flex justify-center flex-col"></div>
    </div>
  );
}
