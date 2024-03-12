import { findUserByEmail } from "../../service/index.js";
import { sendVerificationEmail } from "../../config/exampleEmail.js";

export async function resendVerifyEmail(req, res, next) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "missing required field email" });
    }
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!user.verify) {
      const verificationToken = user.verificationToken;

      await sendVerificationEmail(email, verificationToken);

      return res.status(200).json({ message: "Check your email" });
    }
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  } catch (error) {
    res.status(500).json(`Error message: ${error}`);
  }
}
