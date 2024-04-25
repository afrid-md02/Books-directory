const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
require("dotenv").config();

const User = require("../models/user");
const Book = require("../models/book");
const generateToken = require("../utils/generateToken");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

exports.signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    //validation errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(errors.array()[0].msg);
    }
    //finding user in database
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }
    //encrypting password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //send email and response
    transporter.sendMail(
      {
        from: '"Books directory Admin" <admin001@booksdirectory.com>',
        to: newUser.email,
        subject: "Greetings",
        html: `<h4>Hi ${newUser.name},</h4>
                  <p>Welcome to the Books directory.</p>`,
      },
      (error, response) => {
        if (error) {
          console.log(error.message);
        }
      }
    );
    //success response
    res.status(201).json({ newUser, message: "Signup success!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //validation errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(errors.array()[0].msg);
    }
    //finding user in db
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found signup first");
    }
    //comparing password
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      throw new Error("Incorrect password");
    }

    const token = generateToken(user._id, "Login-Secret", "10h");
    res.status(200).json({
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.userProfile = async (req, res, next) => {
  try {
    const { userId } = req;

    const { name, email } = await User.findById(userId);
    res.status(200).json({ name, email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(errors.array()[0].msg);
    }
    const user = await User.findById(req.userId);
    user.name = name;
    await user.save();
    res.status(201).json({ user, message: "User details updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(errors.array()[0].msg);
    }

    const user = await User.findById(req.userId);
    const check = await bcrypt.compare(oldPassword, user.password);

    if (!check) {
      throw new Error("Incorrect old password");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(201).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req;
    const { password } = req.body;

    //validation errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(errors.array()[0].msg);
    }
    //finding user in db
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    //comparing password
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      throw new Error("Incorrect password");
    }
    await User.findByIdAndDelete(userId);
    await Book.deleteMany({ userId });

    res.status(201).json({ message: "Your account deleted!" });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    //validation errors using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(errors.array()[0].msg);
    }

    //check the user in db
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not registered");
    }

    //create one time link and valid for 15mins
    const token = generateToken(
      user._id,
      `ForgotPassword-Secret+${user.password}`,
      "15min"
    );
    const link = `${process.env.CLIENT_URL}/reset-password/${user._id}/${token}`;

    //send link to email
    const result = await transporter.sendMail({
      from: '"Books directory Admin" <admin001@booksdirectory.com>',
      to: user.email,
      subject: "Password reset",
      html: `<h4>Hi ${user.name},</h4>
          <p>Click this <a href=${link}>link</a> to reset your password.</p>
          <p>Note: The link will expires in 15min and one time use only.</p>`,
    });

    if (result.accepted.length > 0) {
      return res
        .status(200)
        .json({ token, link, message: "Email sent successfully" });
    }
    throw new Error("Failed to send email, please try again");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { userId } = req;
    const { newPassword } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(errors.array()[0].msg);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const user = await User.findById(userId);
    user.password = hashedPassword;
    await user.save();

    res
      .status(201)
      .json({ user, message: "The password has been reset successfully" });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
