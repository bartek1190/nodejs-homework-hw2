import { Contact } from "../shema/schema.js";
import { validateObjectId } from "../validation/validation.js";

export const listContacts = async (_, res, next) => {
  try {
    const contact = await Contact.find();
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const contact = await Contact.findById(contactId);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const removeContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    if (!validateObjectId(contactId)) {
      return res.status(400).json({ message: "Invalid contact ID" });
    }

    const contact = await Contact.findOneAndDelete({ _id: contactId });
    if (contact) {
      res.json({ message: "Contact deleted" });
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const addContact = async (req, res, next) => {
  const body = req.body;

  try {
    const newContact = await Contact.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
    });

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};
