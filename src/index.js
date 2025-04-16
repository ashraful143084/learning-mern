const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const tasksRouter = require("./routes/tasks.router");
const responseFormatter = require("./middleware/responseFormatter.middleware.js");
const authRouter = require("./routes/auth.router.js");
const userRouter = require("./routes/users.router.js");
const app = express();
const port = 3001;
app.use(express.json());

// const corsOptions = {
//   origin: ["example.com", "example2.com"],
// };

app.use(cors());

//create a write stream in append mode

let accessLogStream = fs.createWriteStream(
  path.join(__dirname, "..", "access.log"),
  {
    flags: "a",
  }
);

app.use(morgan("combined", { stream: accessLogStream }));
app.use(responseFormatter);

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

async function bootstrap() {
  try {
    await mongoose.connect(
      "mongodb+srv://ashraful:ET4usICzRQXyQzie@mernjs.0qcjeme.mongodb.net/",
      {
        dbName: "fullstacktasks",
      }
    );
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`App is running on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

bootstrap();
