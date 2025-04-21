const logger = require("./winston.helper");

const errorLogger = (message, req, error) => {
  logger.error(`${message}`, {
    meta: {
      errorCode: error.code,
      errorName: error.name,
      method: error.method,
      url: error.url,
      body: error.body,
      params: error.params,
      query: error.query,
      error: error,
    },
  });
};
