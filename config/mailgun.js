// Plik: config/mailgun.js

import dotenv from "dotenv";
import formData from "form-data";
import Mailgun from "mailgun.js";

dotenv.config();

const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_KEY, // Upewnij się, że w pliku .env klucz jest poprawnie ustawiony
});

export const DOMAIN = process.env.MAILGUN_DOMAIN; // Sprawdź, czy domena jest poprawna w .env
export { client };
