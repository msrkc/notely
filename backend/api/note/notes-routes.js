const express = require("express");
const router = express.Router();
const controller = require("./notes-controller");
const auth = require("../../sevices/auth-service");

router.post("/note", auth.requireLogin, controller.create);
router.get("/note", auth.requireLogin, controller.index);
router.get("/note/:id", auth.requireLogin, controller.show);
router.patch("/note", auth.requireLogin, controller.update);
router.delete("/note/:id", auth.requireLogin, controller.remove);

module.exports = router;
