const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

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

app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(userRoutes);
app.use(bookRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on ${PORT}`);
});
