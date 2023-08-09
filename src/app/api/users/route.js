import { NextResponse } from "next/server";
import User from "@/model/user";
import connectDB from "@/dbconnet/connection";
/*
This method is used to fetch all users data from the database
*/
export async function GET(request, response) {
  try {
    const url = await request.url;

    if (url.match(/\/users$/i)) {
      // Connection to database
      connectDB(process.env.MONGO_URI);
      //Retrieve all users from database
      const users = await User.find();
      return NextResponse.json(users, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
/*
This method is used to save users data into the database
*/
export async function POST(req) {
  try {
    connectDB(process.env.MONGO_URI);
    const reqbody = await req.json();
    const { email, name, mobile, company, vehicleNumber } = reqbody;
    let userFound = await User.findOne({ email });
    if (userFound) {
      return NextResponse.json(
        {
          message: "user already exist",
        },
        { status: 200 }
      );
    }
    const newuser = new User({
      email,
      name,
      mobile,
      company,
      vehicleNumber,
    });
    const saveduser = await newuser.save();
    console.log(saveduser);
    return NextResponse.json(
      { message: "User has been saved successfully." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
