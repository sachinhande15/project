import { NextResponse } from "next/server";
import { findUser } from "@/Services/UserServices";

/*
 * This method is used to find vehicle owner details.
 */
export async function POST(req) {
  try {
    const reqBody = await req.json();
    console.log(reqBody);
    if (!reqBody) {
      return NextResponse.json(
        { message: "please enter a vehicle number", success: false },
        { status: 400 }
      );
    }
    const user = await findUser(reqBody);
    if (!user) {
      return NextResponse.json({ message: "No records found", success: false });
    }
    return NextResponse.json(
      { message: "details found ", user, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
