const winston = require("winston");
const path = require("path");

const transport = [
  new winston.transports.Console({
    level: "info",
    format: winston.format.combine(winston.format.colorize()),
  }),

  new winston.transports.File({
    level: "info",
    filename: path.join(__dirname, "../..", "info.log"),
    format: winston.format.json(),
  }),

  new winston.transports.File({
    level: "error",
    filename: path.join(__dirname, "../..", "error.log"),
    format: winston.format.json(),
  }),
];

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),

    winston.format.printf(
      (info) => `${info.timestamp} [${info.level}] : ${info.message}`
    )
  ),
  transports: transport,
});

module.exports = logger;
