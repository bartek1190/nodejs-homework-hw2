import { DOMAIN, client } from "../config/mailgun.js";

export function sendVerificationEmail(email, verificationToken) {
  const messageData = {
    from: "bartlomiej.m.michonski@gmail.com",
    to: email,
    subject: "Email verification link",
    text: `Hello! Your email verification link: http://localhost:3000/api/users/verify/${verificationToken}`,
  };

  client.messages
    .create(DOMAIN, messageData)
    .then((res) => console.log("Email verification sent to client", res))
    .catch((err) => console.error("Error in sending email:", err));
}
