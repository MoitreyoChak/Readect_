module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  let errorMessage = err.message;

  if (err.name === "MongoServerError" && err.code === 11000) {
    errorMessage = "Email already exists";
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: errorMessage,
  });
};
