const cloudinary = require("cloudinary").v2;
const { validationResult } = require("express-validator");

const Book = require("../models/book");
const User = require("../models/user");
const extractPublicId = require("../utils/extractPublicId");

exports.getAllBooks = async (req, res, next) => {
  try {
    const { category } = req.params;

    if (category === "All") {
      const books = await Book.find();
      res.status(200).json(books);
    } else {
      const books = await Book.find({ category });
      res.status(200).json(books);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAdminBooks = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate("books");
    res.status(200).json({ books: user.books });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBook = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;

    const book = await Book.findById(bookId);
    res.status(200).json({ book });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.postBook = async (req, res, next) => {
  try {
    const imageUrl = req.file?.path;
    const { title, author, description, category } = req.body;

    if (title.trim().length < 4) {
      throw new Error("Title must be min:4 characters");
    }
    if (author.trim().length < 5) {
      throw new Error("Author name must be min:5 characters");
    }
    if (description.trim().length < 6) {
      throw new Error("Description must be min:6 characters");
    }
    if (!imageUrl) {
      throw new Error("Image upload failed! try again.");
    }
    const book = await Book.create({
      title,
      author,
      description,
      category,
      imageUrl,
      userId: req.userId,
    });

    const user = await User.findById(req.userId);

    user.books.push(book._id);
    await user.save();

    res.status(201).json({ book, message: "Book added" });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { title, author, description, category } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(errors.array()[0].msg);
    }

    const book = await Book.findById(bookId);
    book.title = title;
    book.author = author;
    book.description = description;
    book.category = category;
    await book.save();
    res.status(201).json({ book, message: "Book updated" });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);
    const bookImageUrl = book.imageUrl;

    const { publicId, extension } = extractPublicId(bookImageUrl);

    let resourceType;
    if (["jpg", "jpeg", "png"].includes(extension)) {
      resourceType = "image";
    } else if (extension === "svg") {
      resourceType = "raw";
    }

    const result = await cloudinary.api.delete_resources([publicId], {
      type: "upload",
      resource_type: resourceType,
    });

    if (Object.values(result.deleted).includes("not_found")) {
      throw new Error(
        "Failed to delete book image in cloudinary, try again later"
      );
    }

    await Book.findByIdAndDelete(bookId);

    const user = await User.findById(req.userId);
    const books = user.books.filter((id) => id.toString() !== bookId);
    user.books = books;
    await user.save();
    res.status(201).json({ message: "Book deleted", book });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
