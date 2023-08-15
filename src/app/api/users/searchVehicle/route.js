import { NextResponse } from "next/server";
import connectDB from "@/dbconnet/connection";
import User from "@/model/user";

/*
 * This method is used to find vehicle owner details.
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
    const user = await User.findOne(reqBody).select("-password");

    if (!user) {
      return NextResponse.json({ message: "No records found", success: false });
    }
    console.log(user);
    return NextResponse.json(
      { message: "details found ", user, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
