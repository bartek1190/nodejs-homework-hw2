import { nanoid } from "nanoid";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import jimp from "jimp";
import path from "path";
import { User } from "../../service/schemas/users.js";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tmpFolder = path.join(__dirname, "..", "..", "tmp");
const avatarsFolder = path.join(__dirname, "..", "..", "public", "avatars");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tmpFolder);
  },
  filename: function (req, file, cb) {
    const userEmail = req.user.email.split("@")[0];
    const safeUserEmail = userEmail.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    const originalName = file.originalname.split(".")[0];
    const fileExtension = path.extname(file.originalname);
    const newFileName = `${safeUserEmail}-${originalName}${fileExtension}`;
    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage });

async function uploadAvatar(req, res, next) {
  console.log("Uploaded file data:", req.file);

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!req.user || !req.user._id) {
      console.error("User information is missing.");
      return res
        .status(500)
        .json({ message: "Internal Server Error due to missing user data" });
    }

    const image = await jimp.read(req.file.path);
    await image.cover(250, 250).writeAsync(req.file.path);

    const newFileName = req.file.filename;
    const newPath = path.join(avatarsFolder, newFileName);
    await fs.rename(req.file.path, newPath);

    const userId = req.user._id;
    const avatarURL = `/avatars/${newFileName}`;
    await User.findByIdAndUpdate(userId, { avatarURL });

    return res.status(200).json({ avatarURL });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export { upload, uploadAvatar };
