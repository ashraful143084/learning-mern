const User = require("../schema/user.schema");

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });

    return user;
  } catch (error) {
    return error;
  }
};

module.exports = getUserByEmail;
