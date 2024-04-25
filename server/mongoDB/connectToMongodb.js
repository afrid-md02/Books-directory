const mongoose = require("mongoose");

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("db connected");
  } catch (err) {
    console.log("Failed to connect database", err.message);
  }
}

module.exports = connectToMongoDB;
