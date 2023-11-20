const jwt = require("jsonwebtoken");

const expries = process.env.JWT_COOKIE_EXPIRES_IN || 900000;
const environment = process.env.NODE_ENV || "production;";

const createToken = (id, exp) => {
  return jwt.sign({ id: id }, "my-super-secret-string-is-superb", {
    expiresIn: exp,
  });
};

exports.createAndSendToken = (newReader, statusCode, res) => {
  const token = createToken(newReader._id, expries);
  const cookieOptions = {
    expires: new Date(Date.now() + expries * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (environment === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      reader: newReader,
    },
  });
};

exports.createAndSendLogoutToken = (newReader, statusCode, res) => {
  const token = createToken(newReader._id, 0);
  const cookieOptions = {
    expiresIn: 0,
    // expries: new Date(Date.now()),
    httpOnly: true,
  };

  //if (environment === "production") cookieOptions.secure = true;
  res.cookie("jwt", "", cookieOptions);
  res.status(statusCode).json({
    status: "success",
    // token,
    // message: specialMessage ? specialMessage : "Successfully logged out",
    message: "Succesfully Logged Out",
  });
};
