const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const whitelist = ["https://notely.xyz", "http://notely.xyz"];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
const setEnvironment = app => {
  if (process.env.NODE_ENV === "development") {
    setDevEnv(app);
  } else {
    setProdEnv(app);
  }
};
const setDevEnv = app => {
  process.env.NODE_ENV = "development";
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(morgan("dev"));
  app.use(cors());
};

const setProdEnv = app => {
  process.env.NODE_ENV = "production";
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors(corsOptions));
};

module.exports = setEnvironment;
