const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

//configure cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

//Instance of cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png", "jpeg"],
  params: {
    folder: process.env.CLOUDINARY_FOLDER,
    transformation: [
      {
        width: 1000,
        height: 1000,
        crop: "scale",
      },
    ],
  },
});

module.exports = storage;
