import User from "@/model/user";
import connectDB from "@/dbconnet/connection";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

/*
 *@param password
 * This method is used encrypt user password.
 */
const createEncryptedPassword = async (password) => {
  const salt = await bcryptjs.genSalt(5);
  const encryptedPassword = await bcryptjs.hash(password, salt);
  return encryptedPassword;
};
/*
 *@param reqBody
 * This method is used save user
 */
export async function registerUser(email, password, name) {
  try {
    connectDB(process.env.MONGO_URI);
    const userFound = await User.findOne({ email: email });
    if (userFound) {
      return NextResponse.json(
        {
          message: "you are already registered please login",
        },
        {
          status: 200,
        }
      );
    }
    const encryptedPassword = await createEncryptedPassword(password);
    const registerUser = new User({
      email,
      name,
      password: encryptedPassword,
    });
    const userRegister = await User.create(registerUser);
    // const registeredUser = await registerUser.cre();
    console.log(userRegister);
    return NextResponse.json(
      { message: "Registration successful." },
      { status: 201 }
    );
  } catch (error) {
    console.log(error.message);
  }
}

/*
 *@param id
 * This method is used to find user
 */
export async function getUserById(id) {
  try {
    connectDB(process.env.MONGO_URI);
    const userFound = await User.findById({ _id: id });
    if (userFound) {
      console.log("user found successfully");
      return `user found`;
    }
    return `no user`;
  } catch (error) {
    console.log(error);
  }
}
/*
 *@param id
 * This method is used to delete user
 */
export async function deleteUserById(id) {
  try {
    connectDB(process.env.MONGO_URI);
    const userFound = await User.findById({ _id: id });
    if (userFound) {
      await User.deleteOne(userFound);
      console.log("user deleted");
    }
  } catch (error) {
    console.log(error);
  }
}
/*
 *@param id
 * This method is used to update user
 */
export async function updateUserById(id, userData) {
  try {
    const { name, company, mobile, vehicleNumber, email } = userData;
    connectDB(process.env.MONGO_URI);
    const userFound = await User.findById({ _id: id });
    if (userFound) {
      await User.updateOne({
        email: email,
        name: name,
        company: company,
        mobile: mobile,
        vehicleNumber: vehicleNumber,
      });
      console.log("user updated successfully");
      return `user of ${id} updated successfully`;
    }
    return `user with ${id} is not found`;
  } catch (error) {
    console.log(error);
  }
}
