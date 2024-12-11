import { User } from "../models/user.model.js";

export const createNewUser = async ({ username,fullname, email, password }) => {

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    throw new Error("User already exists.");
  }

  const user = await User.create({
    username,
    fullname: {
      firstname:fullname.firstname,
      lastname:fullname.lastname,
    },
    email,
    password,
  });

  return user;
};