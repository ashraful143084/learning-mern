const jwt = require("jsonwebtoken");

const generateTokenProvider = (user) => {
  const payload = {
    sub: user["_id"],
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
    firstName: user.firstName,
    lastName: user.lastName,
    iat: Math.floor(Date.now() / 1000),
    exp:
      Math.floor(Date.now() / 1000) +
      parseInt(process.env.JWT_ACCESS_EXPIRATION_TTL),
  };

  return jwt.sign(payload, process.env.JWT_SECRET);
};

module.exports = generateTokenProvider;
