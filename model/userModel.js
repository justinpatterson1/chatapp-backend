import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  username: String,
  email: String,
  password:String,
 connections:[String]
});

const userModel = mongoose.model("users",userSchema);
export default userModel;