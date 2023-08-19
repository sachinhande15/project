import User from "@/model/user";
import connectDB from "@/dbconnet/connection";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
/*
 * This Method used to find the user by email
 * @param email
 */
export const findUser = async (query) => {
  console.log(query);
  connectDB(process.env.MONGO_URI);
  const oldUser = await User.findOne(query);
  return oldUser;
};

/*
 * This Method used to get all users
 */
export const getAllUsers = async () => {
  connectDB(process.env.MONGO_URI);
  const users = await User.find();
  if (!users)
    return NextResponse.json(
      { message: "No users found", success: false },
      { status: 200 }
    );
  return NextResponse.json(users, { success: true }, { status: 200 });
};

/*
 * This Method used to save user to database
 */
export const saveUserToDB = async (data) => {
  const { email, name, mobile, company, vehicleNumber } = data;
  let userExist = await findUserByEmail(email);
  if (userExist) {
    return NextResponse.json(
      {
        message: "user already exist",
      },
      { status: 200 }
    );
  }
  const newuser = new User({
    email,
    name,
    mobile,
    company,
    vehicleNumber,
  });
  const saveUser = await newuser.save();
  console.log(saveUser);
  return NextResponse.json(
    { message: "User has been saved successfully." },
    { status: 201 }
  );
};

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
 * This method is register user
 */
export async function registerUser(email, password, name) {
  try {
    const userFound = await User.findUser(email);
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
      return NextResponse.json(
        userFound,
        { message: "success", success: true },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: `No User found with ${id}` },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
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
      return NextResponse.json(
        { message: `User with ${id} is deleted successfully.`, success: true },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: `No user is present with ${id}`, success: false },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
/*
 *@param id
 * This method is used to update user
 */
export async function updateUserById(id, userData) {
  try {
    connectDB(process.env.MONGO_URI);
    const userFound = await User.findById({ _id: id });
    if (userFound) {
      await User.updateOne(userData);
      console.log("user updated successfully");
      return NextResponse.json(
        { message: `user of ${id} updated successfully`, success: true },
        { status: 201 }
      );
    }
    return NextResponse.json(
      { message: `user with ${id} is not found`, success: false },
      { status: 200 }
    );
  } catch (error) {
    NextResponse.json({ error: error.message }, { status: 500 });
  }
}
