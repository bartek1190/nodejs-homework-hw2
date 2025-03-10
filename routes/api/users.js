import express from "express";

import authMiddleware from "../../auth.js";
import { logOut } from "../../controllers/users/logOut.js";
import { logIn } from "../../controllers/users/logIn.js";
import { signUp } from "../../controllers/users/signUp.js";
import { upload, uploadAvatar } from "../../controllers/users/uploadAvatar.js";
import { getCurrentUser } from "../../controllers/users/getCurrentUser.js";
import { verify } from "../../controllers/users/verify.js";
import { resendVerifyEmail } from "../../controllers/users/resendVerifyEmail.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", logIn);

router.post("/verify", resendVerifyEmail);

router.get("/current", authMiddleware, getCurrentUser);

router.get("/logout", authMiddleware, logOut);

router.get("/verify/:verificationToken", verify);

router.patch("/avatars", authMiddleware, upload.single("avatar"), uploadAvatar);

export { router };
