import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please use a valid email address."],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  publicKey: {
    type: String,
    required: false,
  },
  privateKey: {
    type: String,
    required: false,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: "10h" }
  );
};

UserSchema.methods.comparePassword = async function (enteredPassword) {
  const isPassword = await bcrypt.compare(this.password, enteredPassword);
  return isPassword;
};

const User = new mongoose.model("User", UserSchema);
export default User;
