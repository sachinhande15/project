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
      unique: [true, "Email address is already exist"],
    },
    password: {
      type: String,
      require: [true, "please provide the password"],
    },
    company: {
      type: String,
    },
    vehicleNumber: {
      type: String,
    },
    mobile: {
      type: String,
    },
    profile: {
      type: String,
    },
  },
  { timestamps: true }
);
const User = mongoose.models.users || mongoose.model("users", UserSchema);

export default User;
