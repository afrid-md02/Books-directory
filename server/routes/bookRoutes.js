const express = require("express");
const multer = require("multer");
const { body } = require("express-validator");

const router = express.Router();
const isAuth = require("../middlewares/auth");
const storage = require("../config/cloudinary");
const multerConfig = require("../config/multerConfig");

const bookController = require("../controllers/bookController");

const upload = multer({
  storage: storage,
  fileFilter: multerConfig,
  limits: { fileSize: 10 * 1024 * 1024 },
});

//fetch all books or category
router.get("/books/:category", bookController.getAllBooks);

//Get  admin books
router.get("/admin-books", isAuth, bookController.getAdminBooks);

//post  book
router.post("/book", isAuth, upload.single("image"), bookController.postBook);

//get single  book
router.get("/book/:bookId", bookController.getBook);

//update book
router.put(
  "/book/edit/:bookId",
  isAuth,
  [
    body("title", "Title must be min:4 characters").trim().isLength({ min: 4 }),
    body("author", "Author name must be min:5 characters")
      .trim()
      .isLength({ min: 5 }),
    body("description", "Description must be min:6 characters")
      .trim()
      .isLength({ min: 5 }),
  ],
  bookController.updateBook
);

//delete book
router.delete("/book/:bookId", isAuth, bookController.deleteBook);

module.exports = router;
