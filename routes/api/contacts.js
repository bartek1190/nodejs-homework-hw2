import express from "express";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
  updateContactFavoriteStatus,
} from "../../models/contacts.js";
import {
  addContactSchema,
  updateContactSchema,
} from "../../validation/validationJoi.js";

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", async (req, res, next) => {
  const { error } = addContactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  addContact(req, res, next);
});

router.delete("/:contactId", removeContact);

router.put("/:contactId", async (req, res, next) => {
  const { error } = updateContactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  updateContact(req, res, next);
});

router.patch("/:contactId/favorite", updateContactFavoriteStatus);

export { router };
