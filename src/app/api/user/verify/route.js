import User from "@/model/user";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import connectDB from "@/dbconnet/connection";
import jwt from "jsonwebtoken";

/*
 * This method is used to verify user
 * @param email
 * @param password
 */
export const verifyCredential = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        {
          message:
            "Sorry 😐 you have not register please signup to access the account. ",
          success: false,
        },
        {
          status: 200,
        }
      );

    // get the encrypted password from the database
    const { password: encryptedPassword } = user;

    //Verify user password with database password
    let matches = await bcryptjs.compare(password, encryptedPassword);
    // console.log(matches);
    if (!matches) {
      return NextResponse.json(
        { message: "You have entered a wrong password", success: false },
        { status: 200 }
      );
    }

    // create token payload
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Create Token
    const token = await jwt.sign(tokenData, process.env.SECERET_TOEKN, {
      expiresIn: "1d",
    });

    // create response to send token
    const response = NextResponse.json(user, {
      message: "login success",
      success: true,
    });

    // set token in response cookies
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};

export async function POST(req) {
  connectDB(process.env.MONGO_URI);
  const { email, password } = await req.json();
  const res = await verifyCredential(email, password);
  return res;
}
