import mongoose from "mongoose";

function connectDB(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("connect to db"))
    .catch((e) => console.log(e));
}
export default connectDB;
