const express = require("express");
const { body } = require("express-validator");

const isAuth = require("../middlewares/auth");
const userController = require("../controllers/userController");
const validateLink = require("../middlewares/validateLink");

const router = express.Router();

router.post(
  "/signup",
  [
    body("name", "Name must be min:5 characters").trim().isLength({ min: 5 }),
    body("email", "Enter valid email").trim().isEmail(),
    body("password", "Password must be min:6 characters")
      .trim()
      .isLength({ min: 6 }),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password must match");
        }
        return true;
      }),
  ],
  userController.signUp
);

router.post(
  "/signin",
  [
    body("email", "Enter valid email").trim().isEmail(),
    body("password", "Password must be min:6 characters")
      .trim()
      .isLength({ min: 6 }),
  ],
  userController.signIn
);

router.get("/user-profile", isAuth, userController.userProfile);

router.put(
  "/update-user",
  isAuth,
  [body("name", "Name must be min:5 characters").trim().isLength({ min: 5 })],
  userController.updateUser
);

router.put(
  "/update-password",
  isAuth,
  [
    body("newPassword", "New Password must be min:6 characters")
      .trim()
      .isLength({ min: 6 }),
    body("confirmNewPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error("New passwords must match");
        }
        return true;
      }),
  ],
  userController.changePassword
);

router.post(
  "/delete-user",
  isAuth,
  [
    body("email", "Enter valid email").trim().isEmail(),
    body("password", "Password must be min:6 characters")
      .trim()
      .isLength({ min: 6 }),
  ],
  userController.deleteUser
);

router.post(
  "/forgot-password",
  [body("email", "Enter valid email").trim().isEmail()],
  userController.forgotPassword
);

router.post(
  "/reset-password/:userId",
  validateLink,
  [
    body("newPassword", "New Password must be min:6 characters")
      .trim()
      .isLength({ min: 6 }),
    body("confirmNewPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error("New passwords must match");
        }
        return true;
      }),
  ],
  userController.resetPassword
);

module.exports = router;
