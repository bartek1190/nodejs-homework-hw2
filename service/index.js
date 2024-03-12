import { nanoid } from "nanoid";
import { Contact } from "./schemas/contacts.js";
import { User } from "./schemas/users.js";
import gravatar from "gravatar";
import { sendVerificationEmail } from "../config/exampleEmail.js";

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = async (id) => {
  return Contact.findOne({ _id: id });
};

const getContactByName = async (name) => {
  return Contact.findOne({ name: name });
};

const createContact = async ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite });
};

const updateContact = async (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const removeContact = async (id) => {
  return Contact.findByIdAndDelete({ _id: id });
};

const updateStatusContact = async (id, favourite) => {
  return Contact.findByIdAndUpdate({ _id: id }, favourite, { new: true });
};

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

const createUser = async ({ email, password }) => {
  const verificationToken = nanoid();
  console.log(verificationToken);
  const avatarURL = gravatar.url(email, { s: "200", r: "pg" });
  const newUser = new User({ email, avatarURL, verificationToken });
  sendVerificationEmail(newUser.email, newUser.verificationToken);
  await newUser.setPassword(password);
  await newUser.save();
  return newUser;
};

const updateUser = async (id, token) => {
  const updateData = {
    $set: {
      token: token,
    },
  };
  await User.findByIdAndUpdate({ _id: id }, updateData, { new: true });
};

const findUserById = async (id) => {
  await User.find({ _id: id });
};

const getUserByVerToken = async (verificationToken) => {
  return User.findOne({ verificationToken });
};

const updateUserVerify = async (id, dataToUpdate) => {
  return await User.findByIdAndUpdate({ _id: id }, dataToUpdate, {
    new: true,
  });
};

export {
  getAllContacts,
  getContactById,
  getContactByName,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
  findUserByEmail,
  createUser,
  updateUser,
  findUserById,
  getUserByVerToken,
  updateUserVerify,
};
