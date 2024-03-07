import { validateAddUser } from "../../validator.js";
import { findUserByEmail, createUser } from "../../service/index.js";
import gravatar from "gravatar";

export async function signUp(req, res, next) {
  const { email, password } = req.body;
  const { error } = validateAddUser(req.body);

  if (error) {
    return res.json({ status: 400, msg: "Missing fields" });
  }

  const user = await findUserByEmail(email);

  if (user) {
    return res.json({ status: 409, msg: "Email in use" });
  }

  try {
    const avatarURL = gravatar.url(email, {
      s: "200",
      d: "identicon",
      r: "pg",
    });
    const avatarURLWithPrefix = `https://${avatarURL}`;
    const newUser = await createUser({
      email,
      password,
      avatarURL: avatarURLWithPrefix,
    });

    return res.status(201).json({
      status: "created",
      code: 201,
      user: {
        email: newUser.email,
        subscription: "starter",
        avatarURL: avatarURLWithPrefix,
      },
    });
  } catch (error) {
    res.status(500).json(`Error message: ${error}`);
  }
}
