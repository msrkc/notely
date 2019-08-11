const express = require("express");

const router = express.Router();

const controller = require("./register-controller");

router.post("/register", controller.index);

module.exports = router;
