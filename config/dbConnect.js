const mongoose = require("mongoose");
require("dotenv").config();
const { DataBaseURL } = process.env;

module.exports = () => {
  mongoose
    .connect(DataBaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log({ error }));
};
