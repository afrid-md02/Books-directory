const User = require("../models/user");
const verifyToken = require("../utils/verifyToken");

module.exports = async (req, res, next) => {
  const { userId } = req.params;
  const token = req.headers.authorization;
  try {
    //finding user in db
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Invalid user id!");
    }

    //verifying token
    const decoded = verifyToken(
      token,
      `ForgotPassword-Secret+${user.password}`
    );
    if (!decoded) {
      throw new Error("Link expired go back and generate new link");
    }
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
