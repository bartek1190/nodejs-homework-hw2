import dotenv from "dotenv";
import formData from "form-data";
import Mailgun from "mailgun.js";

dotenv.config();

const API_KEY = process.env.MAILGUN_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;

const mailgun = new Mailgun(formData);

const client = mailgun.client({
  username: "api",
  key: API_KEY,
});

export { DOMAIN, client };
