import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "please provide the name"],
    },
    email: {
      type: String,
      require: [true, "please provide the email id"],
      unique: true,
    },
    username: {
      type: String,
      require: [true, "please provide the username"],
    },
    password: {
      type: String,
      require: [true, "please provide the password"],
    },
    mobile: {
      type: Number,
      require: [true, "please provide the mobile"],
      unique: true,
    },
    company: {
      type: String,
      require: [true, "please provide the company name"],
    },
  },
  { timestamps: true }
);
const User = mongoose.models.users || mongoose.model("users", UserSchema);

export default User;
