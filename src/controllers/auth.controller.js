const { loginProvider } = require("../providers/auth.provider");

const handleLogin = async (req, res) => {
  return await loginProvider(req, res);
};

module.exports = { handleLogin };
