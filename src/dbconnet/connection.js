import mongoose from "mongoose";

function connectDB(url) {
  if (!url) {
    console.log("url is missing");
    return;
  }
  return mongoose
    .connect(url)
    .then(() => console.log("connect to db"))
    .catch((e) => console.log(e));
}
export default connectDB;
