import Joi from "joi";

export const addContactSchema = Joi.object({
  name: Joi.string().min(2).max(40).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(9).max(17).required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(40),
  email: Joi.string().email(),
  phone: Joi.string().min(9).max(17),
});
