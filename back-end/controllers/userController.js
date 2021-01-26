const userModel = require('../models/userModel');
const createNewJwt = require('../authentication/createToken');

const login = async (req, res) => {
  const { email } = req.body;
  const data = await userModel.searchUserByEmail(email);
  const token = createNewJwt(data);
  const { password, ...user } = data;
  return res.status(200).json({ user, token });
};

module.exports = {
  login,
};
