const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: "book",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
