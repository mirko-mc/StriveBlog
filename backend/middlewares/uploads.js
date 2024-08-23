import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import "dotenv/config";
/** specifico node:path perché potrebbero esservi altri moduli che mettono a disposizione quel nodo */
import path from "node:path";
import crypto from "crypto";

export default multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "epicode",
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    },
  }),
});


/** esporto la funzione UploadLocal passandogli come argomento un un oggetto storage di multer che indicherà la destinazione locale e il nome del file che verrà creato in modo casuale tramite una callback */
export const UploadLocal = (
  storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, callback) => {
      callback(
        null,
        crypto.randomBytes(16).toString("hex") + path.extname(file.originalname)
      );
    },
  })
) => multer({ storage });
