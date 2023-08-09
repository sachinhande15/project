import { NextResponse } from "next/server";

export function GET() {
  const response = NextResponse.json(
    {
      message: "logout successful",
      success: true,
    },
    { status: 200 }
  );
  response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
  return response;
}
