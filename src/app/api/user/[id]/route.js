import { NextResponse } from "next/server";
import React from "react";

export function GET(req) {
  console.log(req.url);
  return NextResponse.json(
    { message: "get request", success: true },
    { status: 200 }
  );
}
