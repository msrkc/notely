const jwt = require("jsonwebtoken");

exports.generateJWT = user => {
  const tokenData = { username: user.username, id: user._id };
  return jwt.sign({ user: tokenData }, process.env.TOKEN_SECRET);
};

exports.requireLogin = (req, res, next) => {
  const token = verifyToken(req);
  if (!token) {
    return res.status(401).json({ message: "you must be logged in." });
  }
  next();
};

const verifyToken = req => {
  const token = req.headers.authorization || req.headers["authorization"];
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

exports.getUserId = req => {
  const token = verifyToken(req);
  if (!token) {
    return null;
  }
  return token.user.id;
};
