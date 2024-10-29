const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    const noTokenError = new Error("No token, authorization denied");
    noTokenError.statusCode = 401;
    throw noTokenError;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    const invalidTokenError = new Error("Token is not valid");
    invalidTokenError.statusCode = 401;
    throw invalidTokenError;
  }
};

module.exports = authMiddleware;
