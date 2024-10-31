const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Extract token from headers
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied: No Token Provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
