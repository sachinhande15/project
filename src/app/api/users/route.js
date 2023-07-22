import { NextResponse } from "next/server";
import User from "@/model/user";
import connectDB from "@/dbconnet/connection";
import bcryptjs from "bcryptjs";
const uri =
  "mongodb+srv://sachin:user@cluster0.ss7zreb.mongodb.net/vechile-parking-databse?retryWrites=true&w=majority";

/*
This method is used to save users data into the database
*/
export async function GET(request, response) {
  try {
    const url = await request.url;
    if (url.match(/\/users$/i)) {
      // Connection to database
      connectDB(uri);
      //Retrive all users from database
      const users = await User.find();
      return NextResponse.json({ users }, { status: 200 });
    } else {
      const searchParams = request.nextUrl.searchParams.get("vechileNumber");
      if (searchParams) {
        connectDB(uri);
        const user = await User.findOne({ vechileNumber: searchParams });
        console.log(user);
        return NextResponse.json({ message: "user found" }, { status: 200 });
      }
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
/*
This method is used to save users data into the database
*/
export async function POST(req, res) {
  try {
    connectDB(uri);
    const reqbody = await req.json();
    const { email, username, password, mobile, company } = reqbody;
    let userFound = await User.findOne({ email });
    if (userFound) {
      console.log("already present");
      return NextResponse.json(
        {
          message:
            "user already registered please login with your emailId and password",
        },
        { status: 200 }
      );
    }

    const newuser = new User({
      email,
      username,
      password: encryptPassword(password),
      mobile,
      company,
    });
    const saveduser = await newuser.save();
    console.log(saveduser);
    return NextResponse.json(
      { message: "user creaetd sucessfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/*
This method is used to encrypt the user password while saving into database
*/
const encryptPassword = async (password) => {
  try {
    const salt = await bcryptjs.genSalt(5);
    const hasspassword = await bcryptjs.hash(password, salt);
    return hasspassword;
  } catch (error) {
    console.log(error);
  }
};
