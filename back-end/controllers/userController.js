const userModel = require('../models/userModel');

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await userModel.searchUserByEmail(email);
  return console.log(result)
}

module.exports = {
  login,
}