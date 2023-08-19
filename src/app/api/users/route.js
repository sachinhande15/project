import { NextResponse } from "next/server";
import { getAllUsers, saveUserToDB } from "@/Services/UserServices";
/*
This method is used to fetch all users data from the database
*/
export async function GET() {
  try {
    // Call service layer to get users from database
    let response = await getAllUsers();
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
/*
This method is used to save users data into the database
*/
export async function POST(req) {
  try {
    const reqbody = await req.json();
    let response = await saveUserToDB(reqbody);
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
