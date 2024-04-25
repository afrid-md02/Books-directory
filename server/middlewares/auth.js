const User = require("../models/user");
const verifyToken = require("../utils/verifyToken");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    //verifying token
    const decoded = verifyToken(token, "Login-Secret");
    if (!decoded) {
      throw new Error("Session expired, login again");
    }
    //finding user in db
    req.userId = decoded.userId;
    const user = await User.findById(req.userId);
    if (!user) {
      throw new Error("User not found");
    } else {
      next();
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
