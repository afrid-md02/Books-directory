const express = require("express");
const dotenv = require("dotenv");

//file imports
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const connectToMongoDB = require("./mongoDB/connectToMongodb");

//variables
const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  next();
});

app.use(userRoutes);
app.use(bookRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on ${PORT}`);
});
