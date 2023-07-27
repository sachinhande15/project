import { NextRequest, NextResponse } from "next/server";
import {
  getUserById,
  updateUserById,
  deleteUserById,
} from "@/helperfunctions/dbmethods";

// find user by Id
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

// find user by ID and delete

export async function DELETE(req, res) {
  try {
    const url = await req.url;
    const id = url.split("/users/")[1];
    await deleteUserById(id);
    return NextResponse.json(
      { message: `user deleted sucessfully with Id ${id}` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// find by id and update user
export async function PUT(req, res) {
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
