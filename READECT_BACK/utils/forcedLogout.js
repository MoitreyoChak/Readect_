const { createAndSendLogoutToken } = require("./tokenGenerator");
const catchAsync = require("../utils/catchAsync");

exports.forcedLogout = catchAsync((req, res, next) => {
  createAndSendLogoutToken(
    req.reader,
    403,
    res,
    "You do not have the permissions to update this poem. Only the creator can update permissions. You are being logged out for inappropriate behaviour!"
  );
});
