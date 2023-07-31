module.exports = (error, req, res, next) => {
  res.status(500).json({
    error: true,
    message: "Internal Server Error!"
  });
}
