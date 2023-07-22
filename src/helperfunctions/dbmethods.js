import User from "@/model/user";
import connectDB from "@/dbconnet/connection";
const uri =
  "mongodb+srv://sachin:user@cluster0.ss7zreb.mongodb.net/vechile-parking-databse?retryWrites=true&w=majority";

// databse connection
export async function getUserById(id) {
  try {
    connectDB(uri);
    const userFound = await User.findById({ _id: id });
    if (userFound) {
      console.log("user found sucessfully");
      return `user found`;
    }
    return `no user`;
  } catch (error) {
    console.log(error);
  }
}
// export default async function deleteUserById(id) {
//     try {
//         connectDB(uri);
//     const userFound = await User.findById({ _id: id });
//     if (userFound) {
//       await User.deleteOne(userFound);
//       console.log("user deleted sucessfully");
//     }

//     } catch (error) {
//         console.log(error)
//     }
// }
export async function deleteUserById(id) {
  try {
    connectDB(uri);
    const userFound = await User.findById({ _id: id });
    if (userFound) {
      await User.deleteOne(userFound);
      console.log("user deleted");
    }
  } catch (error) {
    console.log(error);
  }
}
export async function updateUserById(id, userData) {
  try {
    connectDB(uri);
    const userFound = await User.findById({ _id: id });
    const { name, company, mobileNumber, vechileNumber } = userData;
    if (userFound) {
      await User.updateOne({
        name: name,
        company: company,
        mobileNumber: mobileNumber,
        vechileNumber: vechileNumber,
      });
      console.log("user updated sucessfully");
      return `user of ${id} updated sucessfully`;
    }
    return `user with ${id} is not found`;
  } catch (error) {
    console.log(error);
  }
}
