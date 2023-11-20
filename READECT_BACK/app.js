const express = require("express");
const app = express();
const cors = require('cors')
const readerRoute = require("./routes/readerRoute");
const poemRoutes = require("./routes/poemRoutes");
const bookRoutes = require("./routes/bookRoutes");
const shortStoryRoutes = require("./routes/shortStoryRoutes");
const articleRoutes = require("./routes/articleRoutes");
const reviewRoute = require("./routes/reviewRouter");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
require("dotenv").config();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const { getOtherReader } = require("./controllers/otherReaderController");

app.use(cors({ origin: '*' }))

const limiter = rateLimit({
  max: 1000,
  // windowMs: 60 * 60 * 100, //1hr in milliseconds
  windowMs: 20000, //1hr in milliseconds
  // message: "Too many requests from this IP. Please try again in an hour.",
  message: {
    message: "Too many requests from this IP. Please try again in an hour",
  },
});

app.use("/api", limiter);

app.use(cookieParser());

//set security http headers (preventing anyone to manipulate headers)
app.use(helmet());

//Data sanitization againt NoSQL query injection
app.use(mongoSanitize());

app.use(express.json());

app.use("/api/v1/reader", readerRoute);
app.use("/api/v1/reader/poem", poemRoutes);
app.use("/api/v1/reader/book", bookRoutes);
app.use("/api/v1/reader/shortStory", shortStoryRoutes);
app.use("/api/v1/reader/article", articleRoutes);
app.use("/api/v1/reader/reviews", reviewRoute);

app.get("/api/v1/reader/otheruser/:id", getOtherReader);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
