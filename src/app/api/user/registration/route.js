import { registerUser } from "@/Services/UserServices";
import { NextResponse } from "next/server";

export async function POST(req) {
  const reqBody = await req.json();
  if (!reqBody)
    return NextResponse.json(
      { message: "you must provide data" },
      { status: 400 }
    );
  console.log(reqBody);
  const response = await registerUser(reqBody);
  return response;
}
