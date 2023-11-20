const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Reader = require("./../models/readerModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");
const {
  createAndSendToken,
  createAndSendLogoutToken,
} = require("../utils/tokenGenerator");

exports.signup = catchAsync(async (req, res, next) => {
  const newReader = await Reader.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  createAndSendToken(newReader, 201, res);
});

exports.ifLoggedIn = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token)
    return next(
      new AppError(
        "Please login to continue.If you do not have an account please signup.",
        400
      )
    );
  else {
    const check = await promisify(jwt.verify)(
      token,
      "my-super-secret-string-is-superb"
    );
    res.status(200).json({
      status: "Success",
    });
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please provide an email and a password", 400));
  const reader = await Reader.findOne({ email: email }).select("+password");
  if (!reader || !(await reader.ifCorrectPassword(password, reader.password)))
    return next(new AppError("Incorrect email or password", 400));

  createAndSendToken(reader, 201, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  //GETTING TOKEN AND CHECKING IF ITS THERE
  const token = req.cookies.jwt;
  if (!token)
    return next(
      new AppError(
        "Please login to continue.If you do not have an account please signup.",
        400
      )
    );
  // VERIFY THE TOKEN
  const decoded = await promisify(jwt.verify)(
    token,
    "my-super-secret-string-is-superb"
  );

  //CHECK IF USER STILL EXISTS
  const freshUser = await Reader.findById(decoded.id);
  if (!freshUser) return next(new AppError("User no longer exists", 400));
  //GRANT ACCESS
  req.reader = freshUser;
  next();
});

exports.logout = catchAsync((req, res, next) => {
  createAndSendLogoutToken(req.reader, 200, res);
});
