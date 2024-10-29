const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Check if it's a validation or other known error
  const statusCode = err.statusCode || 500;
  const message = err.message || "Server Error";

  res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
