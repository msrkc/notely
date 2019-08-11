const notesRoutes = require("./api/note/notes-routes");
const regRoutes = require("./api/register/register-routes");
const authRoutes = require("./api/auth/auth-routes");

const registerRoutes = app => {
  app.use("/api", notesRoutes);
  app.use("/api", regRoutes);
  app.use("/api", authRoutes);
};

module.exports = registerRoutes;
