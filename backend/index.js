require("dotenv").config();
const express = require("express");
const app = express();
const registerRoutes = require("./routes");
const setEnvironment = require("./config/env");
const connectToDB = require("./config/db");
setEnvironment(app);
connectToDB();
registerRoutes(app);

app.get("/", (req, res) => {
  if (process.env.NODE_ENV === "development") {
    return res.send("running server in development mode");
  } else {
    return res.send("running server in production mode");
  }
});

app.listen(4000, () => {
  console.log("running on port 4000 in " + process.env.NODE_ENV + " mode!");
});
