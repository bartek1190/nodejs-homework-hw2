import { getUserByVerToken, updateUserVerify } from "../../service/index.js";

export async function verify(req, res, next) {
  const { verificationToken } = req.params;
  const user = await getUserByVerToken(verificationToken);

  const dataToUpdate = {
    verify: true,
    verificationToken: null,
  };

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const id = user._id;
    await updateUserVerify(id, dataToUpdate);
    return res.status(200).json({
      message: `Verification successful. User #${user.email} - verified`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(`Error message: ${err}`);
  }
}
