import { NextResponse } from "next/server";
import { getUserById, updateUserById, deleteUserById } from "@/Utils/dbmethods";

/*
 * This GET method is used to fetch data
 * of particular user
 *@param request
 */
export async function GET(req) {
  try {
    const url = await req.url;
    const id = url.split("/users/")[1];
    let message = await getUserById(id);
    return NextResponse.json({ message: message }, { status: 200 });
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
    const id = url.split("/users/")[1];
    await deleteUserById(id);
    return NextResponse.json(
      { message: `user deleted successfully with Id ${id}` },
      { status: 200 }
    );
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
    const id = url.split("/users/")[1];
    const userData = await req.json();
    const message = await updateUserById(id, userData);
    return NextResponse.json({ message: message }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
