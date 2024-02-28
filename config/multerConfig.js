import path from "path";
import multer from "multer";
import { nanoid } from "nanoid";

const tmp = path.join(process.cwd(), "tmp");
const storeImage = path.join(process.cwd(), "public/avatars");

const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif"];
const mimetypeWhiteList = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmp);
  },
  filename: (req, file, cb) => {
    cb(null, `${nanoid()}${file.originalname}`);
  },
});

const uploadMiddleware = multer({
  storage,
  fileFilter: async (req, file, cb) => {
    const extension = path.extname(file.originalname).toLocaleLowerCase();
    const mimetype = file.mimetype;
    if (
      !extensionWhiteList.includes(extension) ||
      !mimetypeWhiteList.includes(mimetype)
    ) {
      return cb(null, false);
    }
    return cb(null, true);
  },
  limits: { fileSize: 2097152 },
});

export { tmp, storeImage, uploadMiddleware };
