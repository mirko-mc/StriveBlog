import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import "dotenv/config";
/** specifico node:path perché potrebbero esservi altri moduli che mettono a disposizione quel nodo */
import path from "node:path";
import crypto from "crypto";

/** esporto la funzione uploadCloudinary passandogli come argomento un oggetto storage di multer tramite un nuovo CloudinaryStorage */
export const UploadCloudinary = (
  storage = new CloudinaryStorage({
    /** CloudinaryStorage come argomento avrà un oggetto storage composto da cloudinary e i parametri per connettersi al cloud */
    cloudinary,
    params: {
      folder: "epicode",
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    },
  })
  /** il tutto lo diamo in pasto a multer tramite l'argomento oggetto storage */
) => multer({ storage });

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
