async function multerConfig(req, file, cb) {
  const allowedFormats = ["jpg", "jpeg", "png", "svg"];
  const ext = file.originalname.split(".").pop().toLowerCase();
  if (!allowedFormats.includes(ext)) {
    return cb(new Error("Only JPG, JPEG, PNG, and SVG files are allowed"));
  }
  cb(null, true);
}

module.exports = multerConfig;
