import { NextResponse } from "next/server";
import connectDB from "@/dbconnet/connection";
import User from "@/model/user";

/*
 * This method is used to search user by using vehicle number.
 */
export async function POST(req) {
  try {
    connectDB(process.env.MONGO_URI);
    const reqBody = await req.json();
    console.log(reqBody);
    if (!reqBody) {
      return NextResponse.json(
        { message: "please enter a vehicle number", success: false },
        { status: 400 }
      );
    }
    console.log(reqBody);
    const user = await User.findOne(reqBody);
    if (!user)
      return NextResponse.json(
        { message: "No records found", success: false },
        { status: 200 }
      );
    console.log(user);
    let data = {
      name: user.name,
      vehicleNumber: user.vehicleNumber,
    };
    return NextResponse.json(
      data,
      { message: "user found ", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
