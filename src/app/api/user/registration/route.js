import { registerUser } from "@/Utils/dbmethods";
import { NextResponse } from "next/server";

export async function POST(req) {
  const reqBody = await req.json();
  if (!reqBody)
    return NextResponse.json(
      { message: "you must provide data" },
      { status: 400 }
    );
  const { email, password, username } = reqBody;
  const response = await registerUser(email, password, username);
  return response;
}
