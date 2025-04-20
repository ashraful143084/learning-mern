const User = require("../schema/user.schema");

const createUserProvider = async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  return await user.save();
};

module.exports = { createUserProvider };
