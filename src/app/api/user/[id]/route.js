import { NextResponse } from "next/server";

import {
  getUserById,
  deleteUserById,
  updateUserById,
} from "@/Services/UserServices";

/*
 * This GET method is used to fetch data
 * of particular user
 *@param request
 */
export async function GET(req) {
  try {
    const url = await req.url;
    const id = url.split("/user/")[1];
    let response = await getUserById(id);
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
/*
 * This DELETE method is used to Delete data
 * of particular user
 *@param request
 */
export async function DELETE(req) {
  try {
    const url = await req.url;
    const id = url.split("/user/")[1];
    let response = await deleteUserById(id);
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/*
 * This PUT method is used to update data
 * of particular user
 *@param request
 */
export async function PUT(req) {
  try {
    const url = await req.url;
    const id = url.split("/user/")[1];
    const userData = await req.json();
    console.log(userData);
    const response = await updateUserById(id, userData);
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
