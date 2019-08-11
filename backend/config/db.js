const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl =
  process.env.NODE_ENV === "development"
    ? process.env.DB_URL_DEV
    : process.env.DB_URL_PROD;

const connectToDB = () => {
  mongoose.connect(
    dbUrl,
    { useCreateIndex: true, useNewUrlParser: true },
    error => {
      if (error) {
        console.log("cannot to connect");
        throw error;
      } else {
        console.log("connected to mongodb");
      }
    }
  );
};

module.exports = connectToDB;
