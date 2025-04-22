const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");
const tasksRouter = require("../routes/tasks.router");
const responseFormatter = require("../middleware/responseFormatter.middleware.js");
const authRouter = require("../routes/auth.router.js");
const userRouter = require("../routes/users.router.js");
const expressWinstonLogger = require("../middleware/expressWinston.provider.js");

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

  app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json(null);
  });
};

module.exports = configureApp;
