const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");

//configure cloudinary

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

//Instance of cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png", "jpeg"],
  params: async (req, file) => {
    return {
      folder: process.env.CLOUDINARY_FOLDER,
      allowedFormats: ["jpg", "png", "jpeg", "svg"],
      resource_type: "auto",
      maxFileSize: 10000000,
      public_id: file.originalname,
    };
  },
});

module.exports = storage;
