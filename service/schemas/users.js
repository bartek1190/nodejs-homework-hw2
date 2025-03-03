import mongoose from "mongoose";
import bCrypt from "bcryptjs";
import gravatar from "gravatar";

const SchemaUsers = mongoose.Schema;
const users = new SchemaUsers({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  avatarURL: {
    type: String,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

users.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

users.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

export const User = mongoose.model("user", users);
