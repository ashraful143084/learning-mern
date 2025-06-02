const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");
const tasksRouter = require("../crdp/routes/tasks.router.js");
const responseFormatter = require("../crdp/middleware/responseFormatter.middleware.js");
const authRouter = require("../crdp/routes/auth.router.js");
const userRouter = require("../crdp/routes/users.router.js");
const expressWinstonLogger = require("../crdp/middleware/expressWinston.provider.js");
const authorRouter = require("../crdp/routes/author.router.js");
const reviewerRouter = require("../crdp/routes/reviewer.router.js");
const funderRouter = require("../crdp/routes/funder.router.js");
const journalRouter = require("../crdp/routes/journal.router.js");

const configureApp = (app) => {
  app.use(cors());
  // const corsOptions = {
  //   origin: ["example.com", "example2.com"],
  // };
  //create a write stream in append mode

  let accessLogStream = fs.createWriteStream(
    path.join(__dirname, "..", "access.log"),
    {
      flags: "a",
    }
  );

  app.use(morgan("combined", { stream: accessLogStream }));
  app.use(responseFormatter);
  app.use(expressWinstonLogger);

  const middleware = function (req, res, next) {
    req.info = { appname: "Tasks Manager", author: "Ashraful Islam" };
    next();
  };

  app.use(middleware);

  // define routes
  app.use("/", tasksRouter);
  app.use("/", authRouter);
  app.use("/", userRouter);
  app.use("/", authorRouter);
  app.use("/", reviewerRouter);
  app.use("/", funderRouter);
  app.use("/", journalRouter);

  app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json(null);
  });
};

module.exports = configureApp;
